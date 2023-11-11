import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Row, Container, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Container>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item style={{ position: "relative" }}>
            <Image src="image/black-grd.jpg" alt="Slide 1" />
            <Button
              variant="outline-success"
              style={{
                position: "absolute",
                top: "20%",
                left: "30%",
                transform: "translate(-40%, -40%)",
                borderRadius: "50px",
              }}
              href="#"
            >
              Bắt đầu từ hôm nay
            </Button>
            <Image
              style={{
                position: "absolute",
                top: "30%",
                left: "70%",
                transform: "translate(-50%, -50%)",
                width: "20%",
                height: "60%",
              }}
              src="image/logo.png"
            />
            <Carousel.Caption>
              <h3>SGU Pass</h3>
              <p>
                Đối với những người muốn làm nhiều hơn, bảo mật hơn và cộng tác
                nhiều hơn, SGU Pass có thể thiết lập nhanh chóng và dễ dàng cho
                cả cá nhân và doanh nghiệp.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="image/black-grd.jpg" alt="Slide 2" />
            <Image
              style={{
                position: "absolute",
                top: "30%",
                left: "70%",
                transform: "translate(-50%, -50%)",
                width: "20%",
                height: "60%",
              }}
              src="image/logo.png"
            />
            <Carousel.Caption>
              <h3>Chia sẻ thông tin</h3>
              <p>Chia sẻ dữ liệu an toàn</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="image/black-grd.jpg" alt="Slide 3" />
            <Image
              style={{
                position: "absolute",
                top: "30%",
                left: "70%",
                transform: "translate(-50%, -50%)",
                width: "20%",
                height: "60%",
              }}
              src="image/logo.png"
            />
            <Carousel.Caption>
              <h3>Mật khẩu không giới hạn, thiết bị không giới hạn</h3>
              <p>
                Truy cập đa nền tảng cho các ứng dụng dành cho thiết bị di động,
                trình duyệt và máy tính để bàn
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container style={{ marginTop: "15px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="image/a.png" style={{ marginRight: "10px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2>
              Tạo, hợp nhất và tự động điền mật khẩu mạnh và an toàn cho tất cả
              tài khoản của bạn
            </h2>
            <p>
              SGUPass cung cấp cho bạn khả năng tạo và quản lý mật khẩu duy
              nhất, do đó bạn có thể tăng cường quyền riêng tư và tăng năng suất
              trực tuyến từ bất kỳ thiết bị hoặc vị trí nào.
            </p>
          </div>
        </div>
      </Container>
      <Container style={{ marginTop: "15px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2>
              Chia sẻ thông tin được mã hóa một cách an toàn trực tiếp với bất
              kỳ ai
            </h2>
            <p>
              SGUPass Send là một tính năng cho phép tất cả người dùng truyền dữ
              liệu trực tiếp cho người khác, đồng thời duy trì bảo mật được mã
              hóa hai đầu và hạn chế tiếp xúc.
            </p>
          </div>
          <Image src="image/b.png" style={{ marginRight: "10px" }} />
        </div>
      </Container>
      <Container style={{ marginTop: "15px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="image/c.png" style={{ marginRight: "10px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2>Đạt được sự an tâm với sự tuân thủ toàn diện</h2>
            <p>
              Bảo vệ dữ liệu trực tuyến của bạn bằng trình quản lý mật khẩu mà
              bạn có thể tin cậy. SGUPass tiến hành kiểm tra bảo mật thường
              xuyên của bên thứ ba và tuân thủ các tiêu chuẩn GDPR, SOC 2,
              HIPAA, Privacy Shield và CCPA.
            </p>
          </div>
        </div>
      </Container>
      <div style={{ background: "gray", color: "white" }}>
        <Container>
          <Row>
            <Col style={{ marginTop: "10px" }}>
              <h3>Liên hệ với chúng tôi</h3>
            </Col>
            <Col style={{ marginTop: "10px" }}>
              <h3>Tài nguyên</h3>
            </Col>
            <Col style={{ marginTop: "10px" }}>
              <h3>Công cụ và trợ giúp</h3>
            </Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
          <Row>
            <Col>1 of 4</Col>
            <Col>2 of 4</Col>
            <Col>3 of 4</Col>
          </Row>
          <Row>
            <Col>1 of 5</Col>
            <Col>2 of 5</Col>
            <Col>3 of 5</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
