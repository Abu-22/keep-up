import React, { useState, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Table from "../../components/dashboard/Table";
import { useAppContext } from "../../context/index";
import router from "next/router";
import { parseCookies } from "nookies";
import TableSkeleton from "../../components/TableSkeleton";
import { getAll, add, remove } from "../../services/mediapackService"; 


// {"title": "", "link":"", "description":"", suburb:""}
const columns = [
  {
    title: "id",
    field: "id"
  },
  {
    title: "title",
    field: "title",
  },
  {
    title: "link",
    field: "link",
  },
  {
    title: "description",
    field: "description"
  },
  {
    title: "suburb",
    field: "suburb",
    lookup: { sandown: "Sandown", bramley: "Bramley" }
  }
];




export default function mediapacks() {
  const [mediapacks, setmediapacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { checkSession } = useAppContext();

  useEffect(() => {
    const cookies = parseCookies();
    if (
      Object.keys(cookies).length !== 0 &&
      cookies.constructor === Object &&
      cookies.token
    ) {
      checkSession();
    } else {
      router.push("/dashboard/signin");
    }
    (async () => {
      setLoading(true);
      setmediapacks(await getAll());
      setLoading(false);
    })();
  }, []);

  const addItem = (newData) => (async () => add(newData))();
  const deleteItem = (mediapackId) => (async () => remove(mediapackId))();

  if (loading) {
    return (
      <Dashboard>
        <TableSkeleton />
      </Dashboard>
    );
  } else {
    return (
      <Dashboard>
        <Table
          columns={columns}
          title={"Mediapacks"}
          deleteItem={deleteItem}
          addItem={addItem}
          setData={setmediapacks}
          data={mediapacks}
         //updateItem = {updateItem}
        />
      </Dashboard>
    );
  }
}
