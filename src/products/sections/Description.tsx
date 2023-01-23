import { useContext } from "react";

import { Grid, Stack, Typography } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";
import RichEditor from "components/RichEditor";

import { ProductsContext } from "../context/ProductsContext";
import { useSelector } from "store";

const Description = () => {
  const { richEditor } = useSelector((state) => state.main),
    { state, dispatch } = useContext(ProductsContext);

  // console.log("description state = ", state);

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
              <Typography variant="h5" sx={{ mb: "18px" }}>
                Short Description
              </Typography>
              <RichEditor
                value={state.itemShortDescription}
                onEditorChange={(event: string) =>
                  dispatch({
                    type: "editor",
                    payload: { name: "itemShortDescription", value: event },
                  })
                }
              />
              <Typography variant="h5" sx={{ mb: "18px" }}>
                Long Description
              </Typography>
              <RichEditor
                value={state.itemLongDescription}
                onEditorChange={(event: string) =>
                  dispatch({
                    type: "editor",
                    payload: { name: "itemLongDescription", value: event },
                  })
                }
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
