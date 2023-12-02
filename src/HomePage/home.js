import React, { useEffect, useState } from "react";
import "./home.css";
// import { data } from "../utils/constants";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [loading, updateLoading] = useState(false);
  const [data, updateData] = useState([]);
  const [str, updateStr] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    updateLoading(true);
    const response = await fetch("http://127.0.0.1:8002/listing_data?lead_id=10585943&count=4");
    let data = await response.json();
    updateLoading(false);
    updateData(data?.data);
    updateStr(data?.data?.map(val => val.id))
  }

  useEffect(() => {
    fetchData();
  }, [])

  return <div div className="localContainer" >
    {loading ? <div class="loader"></div> :
      <div>
        <div style={{ textAlign: "center" }}> <h1 className="fs-heading">Compare with other best similar cars</h1></div>
        <div className="overflow">
          <div className="column-container">
            {data?.map((col) => {
              return <div className={col.best ? "column activeCard" : "column"}>
                {col.best && <div className="bestCarDetails">Top Pick</div>}
                <div style={{ textAlign: "center", padding: '10px' }}><img alt="img" className="img" src={"https:" + col.product_photos?.images?.exterior?.[0]?.file?.url} /></div>
                <div style={{ textAlign: "center" }}><h1>{col?.variant?.full_name}</h1></div>
                <br />
                <p><span>Price : </span> <h4>Rs. {col?.price}</h4></p>
                <p><span>Km Driven : </span> <h4>{col?.mileage} Km</h4></p>
                <p><span>No. of Owners : </span> <h4>{col?.no_of_owners}</h4></p>
                <p><span>Make Year : </span> <h4>{col?.make_year}</h4></p>
                <p><span>Fuel Type : </span> <h4>{col?.fuel_type}</h4></p>
                {/* <p><span>Buy Back Price : </span> <h4>{col?.buy_back_pricing?.[12]?.value}</h4></p> */}
              </div>
            })}
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          {console.log('str: ', str)}
          <button onClick={() => navigate("/comparisonTool/" + str)} className="viewMore">view more</button>
        </div>
      </div>
    }
  </div>
}
export default Home;
