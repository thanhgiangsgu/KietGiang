import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./warehouse.css";

function Warehouse() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
        flexDirection: "column",
        marginLeft: "40%",
      }}
    >
      <Table responsive className="table-border-bottom">
        <thead>
          <tr style={{ display: "flex", alignItems: "center" }}>
            <th>
              <Form>
                <div
                  style={{ marginRight: "50px" }}
                  key="default-checkbox"
                  className="mb-3"
                >
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="All"
                  />
                </div>
              </Form>
            </th>
            <th style={{ marginRight: "50px" }}>Tên</th>
            <th style={{ marginRight: "50px" }}>Owner</th>
            <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item href="#/action-1">
                Di chuyển mục đã chọn
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Đặt làm yêu thích</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Xóa mục đã chọn</Dropdown.Item>
            </DropdownButton>
          </tr>
        </thead>
      </Table>
      <div style={{ width: "50px", marginTop: "10%" }}>
        <Button variant="primary" onClick={handleShow}>
          Thêm
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mục mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mục này là gì?</Form.Label>
                <Form.Control placeholder="Đăng nhập/ghi chú/..." autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên</Form.Label>
                <Form.Control placeholder="Tên tài khoản" autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mật Khẩu</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>URL</Form.Label>
                <Form.Control type="url" placeholder="facebook.com" autoFocus />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Warehouse;
