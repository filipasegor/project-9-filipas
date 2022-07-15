import React, { useState, useEffect } from "react";
import Item from "./Item.js";
import Loader from "./Loader.js";

export default function Shop() {


  const [items, setItems] = useState()
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch ("https://covid-shop-mcs.herokuapp.com")
        const data = await response.json()
        if(data){
          console.log(data);
          setItems(data)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false)
      }
    })()
  }, []);



  return (<>
    {loader && <Loader />}
    <div className="shop">
      <ul>
      {items && items.map((item) => (
          <Item key={item.id} id={item.id} info={item} />
        ))}
      </ul>
    </div>
  </>)
}
