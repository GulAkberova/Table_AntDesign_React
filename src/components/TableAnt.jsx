import {
  Button,
  Table,
  Modal,
  Space,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import React, { useState, useEffect } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
function TableAnt() {
  const { confirm } = Modal;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [products, setproducts] = useState([]);
  // console.log(products)
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setproducts(data);
        console.log(products);
      });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        fetch(`https://northwind.vercel.app/api/orders/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status == 200) getProducts();
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  const handleUpdate = () => {
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "customerId",
      dataIndex: "customerId",
    },
    {
      title: "orderDate",
      dataIndex: "orderDate",
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
    },
    {
      title: "shipVia",
      dataIndex: "shipVia",

      sorter: (a, b) => a.shipVia > b.shipVia,
    },
    {
      title: "DElete",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => showDeleteConfirm(id)}>Delete</Button>
      ),
    },
    {
      title: "Update",
      dataIndex: "id",
      render: (id) => <Button onClick={() => handleUpdate(id)}>Update</Button>,
    },
  ];
  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
      ;
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          // onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="customerId"
            label="Customer Id"
            // initialValue='eagfergr'
            initialValue={products.customerId}
            rules={[
              {
                required: true,
                message: "Please input your Customer Id!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="orderDate"
            label="Order Date"
            initialValue={dayjs(products.orderDate)}
            rules={[
              { required: true, message: "Please input your Order Date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Ship Via"
            name="shipVia"
            initialValue={products.shipVia}
            rules={[
              {
                required: true,
                message: "Please input your Ship Via!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TableAnt;
