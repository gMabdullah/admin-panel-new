import React, { useState, createContext } from "react";

const defaultValue = {
  options: [],
  setOptions: "",
  indexOptionSet: 0,
  setIndexOptionSet: "",
  optionSetEdit: false,
  setOptionSetEdit: "",
  selectedOrderContext: {},
  setSelectedOrderContext: "",
  editAbleItem: [],
  setEditAbleItem: "",
  preventOrderUpdate: false,
  setPreventOrderUpdate: () => {},
};

export const OptionSetContext =
  createContext<AppContextInterface>(defaultValue);

export const OptionSetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [options, setOptions] = useState<any>([]);
  const [indexOptionSet, setIndexOptionSet] = useState(0);
  const [optionSetEdit, setOptionSetEdit] = useState(false);
  const [selectedOrderContext, setSelectedOrderContext] = useState({});
  const [editAbleItem, setEditAbleItem] = useState([]);
  const [preventOrderUpdate, setPreventOrderUpdate] = useState<boolean>(false);

  return (
    <OptionSetContext.Provider
      value={{
        options,
        setOptions,
        indexOptionSet,
        setIndexOptionSet,
        optionSetEdit,
        setOptionSetEdit,
        selectedOrderContext,
        setSelectedOrderContext,
        editAbleItem,
        setEditAbleItem,
        preventOrderUpdate,
        setPreventOrderUpdate,
      }}
    >
      {children}
    </OptionSetContext.Provider>
  );
};
