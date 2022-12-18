import { SyntheticEvent, useContext, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Tabs, Typography } from '@mui/material';
import { OptionSetContext } from '../context/OptionSetContext';
import { getHeaderString, getMinMaxAndRequired } from '../HelperFunctions';
import OptionSetLayer1 from './optionSet1/OptionSetLayer1';

const SelectOptionSet = () => {
  const { options, setOptions, indexOptionSet, setIndexOptionSet } =
    useContext(OptionSetContext);
  const [isOptionsUpdated, setIsOptionsUpdated] = useState<boolean>(false);

  //======================================= Handlers =======================================//

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setIndexOptionSet(newValue);
  };

  const handleSlideChange = (index: number) => {
    setIndexOptionSet(index);
  };

  const getTabsContent = (index: number) => {
    if (!isOptionsUpdated) {
      const optionSetReceived =
        options &&
        options.map((option: any, optionIndex: number) => {
          let minMaxRequiredObj = getMinMaxAndRequired(option);
          option.max = minMaxRequiredObj.max;
          option.min = minMaxRequiredObj.min;
          option.required = minMaxRequiredObj.required;
          option.totalSelected = 0;
          return option;
        });

      setOptions(optionSetReceived);
      setIsOptionsUpdated(true);
    }

    return (
      <OptionSetLayer1 parentIndex={index} indexOptionSet={indexOptionSet} />
    );
  };

  return (
    <>
      <Tabs
        value={indexOptionSet}
        indicatorColor="primary"
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            borderBottom: "none",
          },
          "& .MuiTabs-indicator": {
            height: "4px",
            background: "#24335E",
            borderRadius: "0 0 4px 4px",
          },
        }}
        aria-label="product description tabs example"
        variant="scrollable"
      >
        {options &&
          options.map((tab: OptionSetProps, index: number) => {
            return (
              <Tab
                sx={{
                  width: "186px",
                  height: "74px",
                  background: "#F5F5F5",
                  borderRadius: "8px",
                  marginRight: "6px",
                  textAlign: "left",
                  alignItems: "unset",
                }}
                key={index}
                label={
                  <>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#212121",
                      }}
                    >
                      {tab.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "#616161",
                      }}
                    >
                      {getHeaderString(getMinMaxAndRequired(tab))}
                    </Typography>
                  </>
                }
              />
            );
          })}
      </Tabs>

      <SwipeableViews
        index={indexOptionSet}
        onChangeIndex={handleSlideChange}
        enableMouseEvents
        style={{ marginBottom: "32px" }}
      >
        {options &&
          options.map((option: OptionSetProps, index: number) => (
            <div key={index}>{getTabsContent(index)}</div>
          ))}
      </SwipeableViews>
    </>
  );
};

export default SelectOptionSet;
