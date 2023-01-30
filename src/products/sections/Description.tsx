import React, { useContext } from "react";

import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";
import RichEditor from "components/RichEditor";

import { ProductsContext } from "../context/ProductsContext";
import { useSelector } from "store";

interface DescriptionProp {
  shortDescription: string;
  longDescription: string;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  setLongDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Description = ({
  shortDescription,
  longDescription,
  setShortDescription,
  setLongDescription,
}: DescriptionProp) => {
  const { richEditor } = useSelector((state) => state.main),
    { state, dispatch } = useContext(ProductsContext);

  return (
    <Stack>
      <ExpandablePanel
        id="description"
        title="Description"
        subTitle="Allows to add description for the product"
      >
        <Grid container>
          {richEditor ? (
            <>
              <p>Short Description</p>
              <RichEditor
                description={shortDescription}
                setDescriptionFromItem={
                  (e) => setShortDescription(e.target.value)
                  // dispatch({
                  //   type: "textField",
                  //   payload: { name: e.target.name, value: e.target.value },
                  // })
                }
                itemEditor={true}
              />
              <p>Long Description</p>
              <RichEditor
                description={longDescription}
                setDescriptionFromItem={
                  (e) => setLongDescription(e.target.value)
                  // dispatch({
                  //   type: "textField",
                  //   payload: { name: e.target.name, value: e.target.value },
                  // })
                }
                itemEditor={true}
              />
            </>
          ) : (
            <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
              <TdTextField
                name="itemDescription"
                value={state.itemDescription}
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
