import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormContextType {
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setValue: (field: keyof FormValues, value: string) => void;
}

const defaultValues: FormValues = {
  name: '',
  email: '',
  message: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext deve ser usado dentro de um FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<FormValues>(defaultValues);

  const setValue = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <FormContext.Provider value={{ values, setValues, setValue }}>
      {children}
    </FormContext.Provider>
  );
};
