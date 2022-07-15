import React, { useState, useEffect } from "react";
import Item from "./Item.js";
import Loader from "./Loader.js";

export default function Shop() {


  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    if(saved){
      return JSON.parse(saved);
    } else {
      return []
    }
  });

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch ("https://covid-shop-mcs.herokuapp.com")
        const data = await response.json()
        if(data){
          console.log(data);
          setItems([...items, { name: data.name, desc: data.desc}])
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
