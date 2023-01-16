import React, { useContext, useState } from "react";

import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

import { ProductsContext } from "../context/ProductsContext";
import { useSelector } from "store";
import RichEditor from "components/RichEditor";

const Description = () => {
  const { richEditor } = useSelector((state) => state.main),
    { state, dispatch } = useContext(ProductsContext);

  // console.log("item Description = ", state.itemDescription);
  return (
    <Stack>
      <ExpandablePanel
        id="description"
        title="Description"
        subTitle="Allows to add description for the product"
      >
        <Grid container>
          {richEditor ? (
            <RichEditor
              description={state.itemDescription}
              setDescriptionFromItem={(e) =>
                dispatch({
                  type: "textField",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
              itemEditor={true}
            />
          ) : (
            <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
              <TdTextField
                name="itemDescription"
                rows={6}
                multiline={true}
                label="Description"
                type="text"
                onChange={(e) =>
                  dispatch({
                    type: "textField",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </Grid>
          )}
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default Description;
