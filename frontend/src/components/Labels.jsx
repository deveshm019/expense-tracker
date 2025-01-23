import React from "react";
import { default as api } from "../store/apiSlice.js";
import {getLabels} from '../helper/helper.js'

export default function Labels() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  
  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data,'type').map((val, ind) => (
      <LabelComponent key={ind} data={val}></LabelComponent>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <>
      {Transactions}
    </>
  );
}

function LabelComponent({ data }) {
  if (!data) {
    return <></>;
  }

  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ backgroundColor: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
