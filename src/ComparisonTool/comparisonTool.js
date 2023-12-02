import React, { useEffect, useRef, useState } from "react";
import "../HomePage/home.css";
// import { data } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ComparisonTool = (props) => {
  const navigate = useNavigate();
  const [showInventory, setShowInventory] = useState(false);
  const [loading, updateLoading] = useState(true);
  const [leadId, updateLeadId] = useState([]);
  const [data, updateData] = useState([]);
  const [removeId, updateRemoveId] = useState("");
  const [modalData, updateModalData] = useState([]);
  // const leadId = useRef([]);

  const fetchData = async (params) => {
    let leadIdData = params ? params : leadId?.join(',');
    console.log('leadIdData: ', leadIdData);
    updateLoading(true)
    const url = `http://127.0.0.1:8002/product_data?listings_ids=${leadIdData}`
    const response = await fetch(url);
    let data = await response.json();
    updateLoading(false);
    updateData(data?.data);
    updateLeadId(leadIdData.split(","))
  }

  const fetchDataModal = async () => {
    updateLoading(true)
    const url = 'http://127.0.0.1:8002/listing_data?lead_id=10585943&count=12'
    const response = await fetch(url);
    let data = await response.json();
    updateLoading(false);
    updateModalData(data?.data?.results);
  }

  useEffect(() => {
    let params = window.location.pathname.split('/')[2]
    if (params) {
      updateLeadId(params.split(","));
      fetchData(params);
    }
  }, [])

  return (
    <div div className="localContainer">
      <button
        style={{ display: "inline" }}
        onClick={() => navigate("/10585943")}
        className="viewMore"
      >
        Back
      </button>
      <div style={{ textAlign: 'center' }}>
        <p className="fs-heading">Car Comparison View</p>
      </div>
      {loading ? <div class="loader"></div> : <div className="overflow">
        <div className="column-container">
          {data?.map((col) => {
            return (
              <div className={col.best ? "column activeCard" : "column"}>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setShowInventory(true)
                    fetchDataModal()
                    updateRemoveId(col.id)
                  }}
                  className="minusIcon"
                >
                  Change
                </button>
                {col.best && <div className="bestCarDetailsBig">Top Pick</div>}
                <div style={{ textAlign: "center", padding: '10px' }}><img alt="img" className="imgBig" src={"https:" + col.product_photos?.images?.exterior?.[0]?.file?.url} /></div>
                <h1 style={{ marginBottom: '10px', textAlign: 'center' }} >{col?.variant?.full_name}</h1>
                <br />
                <p><span>Price : </span> <h4> Rs. {col?.price}</h4></p>
                <p><span>Km Driven : </span> <h4>{col?.mileage} Km</h4></p>
                <p><span>No. of Owners : </span> <h4>{col?.no_of_owners}</h4></p>
                <p><span>Make Year : </span> <h4>{col?.make_year}</h4></p>
                {/* <p><span>Buy Back Price : </span> <h4>{col?.buy_back_pricing?.[12]?.value}</h4></p> */}

                <p><span>Seating Capacity : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[1]?.value} Units</h4></p>
                <p><span>Boot space : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[2]?.value} L</h4></p>
                <p><span>Fuel Tank Capacity : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[3]?.value} L</h4></p>
                <p><span>Engine cc : </span> <h4>{col?.technicalSpecification?.specification?.top_specification?.[7]?.value ? col?.technicalSpecification?.specification?.top_specification?.[7]?.value : "NA"}</h4></p>
                <p><span>Mileage : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[2]?.values?.[2]?.value} Kmpl</h4></p>
                <p><span>Fuel Type : </span> <h4>{col?.fuel_type}</h4></p>
                <p><span>Transmission Type : </span> <h4>{col?.transmission}</h4></p>
                <p><span>Body Type : </span> <h4>{col?.variant?.body_type}</h4></p>
                <p><span>Km Driven : </span> <h4>{col?.mileage} Km</h4></p>
                <p><span>No. of Owners : </span> <h4>{col?.no_of_owners}</h4></p>
                <p><span>Make Year : </span> <h4>{col?.make_year}</h4></p>
                {/* <p><span>Buy Back Price : </span> <h4>{col?.buy_back_pricing?.[12]?.value}</h4></p> */}

                <p><span>Seating Capacity : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[1]?.value} Units</h4></p>
                <p><span>Boot space : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[2]?.value} L</h4></p>
                <p><span>Fuel Tank Capacity : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[0]?.values?.[3]?.value} L</h4></p>
                <p><span>Engine cc : </span> <h4>{col?.technicalSpecification?.specification?.top_specification?.[7]?.value ? col?.technicalSpecification?.specification?.top_specification?.[7]?.value : "NA"}</h4></p>
                <p><span>Mileage : </span> <h4>{col?.technicalSpecification?.specification?.specification_category?.[2]?.values?.[2]?.value} Kmpl</h4></p>
                <p><span>Fuel Type : </span> <h4>{col?.fuel_type}</h4></p>
                <p><span>Transmission Type : </span> <h4>{col?.transmission}</h4></p>
                <p><span>Body Type : </span> <h4>{col?.variant?.body_type}</h4></p>
              </div>
            );
          })}
        </div>
      </div>}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onCloseModal={() => setShowInventory(false)}
        show={showInventory}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            More Cars
          </Modal.Title>
          <button className="closeButton" onClick={() => setShowInventory(false)} >X</button>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "auto",
          }}
        >
          {loading ? <div class="loader"></div> :
            <Row xs={1} md={2} className="g-4">
              {modalData && modalData?.map((col, idx) => (
                <Col key={idx}>
                  <Card onClick={
                    () => {
                      console.log('removeId: ', removeId);
                      const removeIdIndex = leadId?.findIndex(val => val == removeId)
                      console.log('removeIdIndex: ', removeIdIndex);
                      setShowInventory(false)
                      updateLeadId(leadId?.push(col?.id));
                      updateLeadId(leadId?.splice(removeIdIndex, 1));
                      fetchData()
                    }
                  } className="card">
                    <div style={{ textAlign: "center" }}>
                      <Card.Img
                        variant="top"
                        src={"https:" + col?.images?.[0]?.file?.absurl}
                      />
                      <Card.Body>
                        <Card.Title>{col?.make_year + " " + col?.make + " " + col?.model + " " + col?.variant}</Card.Title>
                      </Card.Body>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          }
        </Modal.Body>
      </Modal>
    </div >
  );
};
export default ComparisonTool;
