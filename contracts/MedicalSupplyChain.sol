pragma solidity ^0.8.0;
// SPDX-License-Identifier: Apache-2.0

contract MedicalSupplyChain {
    enum Status {Created, Delivering, Delivered, Accepted, Declined}

    struct Order {
        string title;
        string description;
        address supplier;
        address deliveryCompany;
        address customer;
        Status status;
    }

    Order[] public orders;
    mapping(address => uint256[]) public selfOrders;

    // Events to track changes
    event OrderCreated(uint256 indexed index, address indexed deliveryCompany, address indexed customer);
    event OrderDelivering(uint256 indexed index, address indexed supplier, address indexed customer);
    event OrderDelivered(uint256 indexed index, address indexed supplier, address indexed customer);
    event OrderAccepted(uint256 indexed index, address indexed supplier, address indexed deliveryCompany);
    event OrderDeclined(uint256 indexed index, address indexed supplier, address indexed deliveryCompany);

    modifier onlyOrderDeliveryCompany(uint256 _index) {
        require(orders[_index].deliveryCompany == msg.sender, "Not the delivery company");
        _;
    }

    modifier onlyCustomer(uint256 _index) {
        require(orders[_index].customer == msg.sender, "Not the customer");
        _;
    }

    modifier orderCreated(uint256 _index) {
        require(orders[_index].status == Status.Created, "Order is not in Created status");
        _;
    }

    modifier orderDelivering(uint256 _index) {
        require(orders[_index].status == Status.Delivering, "Order is not in Delivering status");
        _;
    }

    modifier orderDelivered(uint256 _index) {
        require(orders[_index].status == Status.Delivered, "Order is not in Delivered status");
        _;
    }

    // Get details of an order by index
    function getOrder(uint256 _index) public view returns (
        string memory title,
        string memory description,
        address supplier,
        address deliveryCompany,
        address customer,
        Status status
    ) {
        require(_index < orders.length, "Index out of bounds");
        Order memory order = orders[_index];
        return (order.title, order.description, order.supplier, order.deliveryCompany, order.customer, order.status);
    }

    // Create an order and push it to the orders array
    function createOrder(
        string memory _title,
        string memory _description,
        address _deliveryCompany,
        address _customer
    ) public returns (uint256) {
        require(_deliveryCompany != address(0), "Invalid delivery company address");
        require(_customer != address(0), "Invalid customer address");

        Order memory order = Order({
            title: _title,
            description: _description,
            supplier: msg.sender,
            deliveryCompany: _deliveryCompany,
            customer: _customer,
            status: Status.Created
        });

        uint256 index = orders.length;
        emit OrderCreated(index, _deliveryCompany, _customer);
        orders.push(order); 
        
        // Store the index of the order for the involved parties
        selfOrders[msg.sender].push(index);
        selfOrders[_deliveryCompany].push(index);
        selfOrders[_customer].push(index);

        return index;
    }

    // Start delivery for an order
    function startDeliveringOrder(uint256 _index) public onlyOrderDeliveryCompany(_index) orderCreated(_index) {
        Order storage order = orders[_index];
        emit OrderDelivering(_index, order.supplier, order.customer);
        order.status = Status.Delivering;
    }

    // Stop delivery for an order
    function stopDeliveryOrder(uint256 _index) public onlyOrderDeliveryCompany(_index) orderDelivering(_index) {
        Order storage order = orders[_index];
        emit OrderDelivered(_index, order.supplier, order.customer);
        order.status = Status.Delivered;
    }

    // Accept the order
    function acceptOrder(uint256 _index) public onlyCustomer(_index) orderDelivered(_index) {
        Order storage order = orders[_index];
        emit OrderAccepted(_index, order.supplier, order.deliveryCompany);
        order.status = Status.Accepted;
    }

    // Decline the order
    function declineOrder(uint256 _index) public onlyCustomer(_index) orderDelivered(_index) {
        Order storage order = orders[_index];
        emit OrderDeclined(_index, order.supplier, order.deliveryCompany);
        order.status = Status.Declined;
    }

    // Retrieve all orders for a specific address
    function getSelfOrders(address _address) public view returns (Order[] memory) {
        uint256[] memory orderIndices = selfOrders[_address];
        Order[] memory userOrders = new Order[](orderIndices.length);

        for (uint256 i = 0; i < orderIndices.length; i++) {
            userOrders[i] = orders[orderIndices[i]];
        }

        return userOrders;
    }

    // Get the total number of orders
    function getOrdersCount() public view returns (uint256) {
        return orders.length;
    }
}