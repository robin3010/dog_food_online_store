import clsx from 'clsx';
import { useField } from 'formik';
import { useState } from 'react';

export function FloatingInput({
  label, maxValue, ...props
}) {
  const { type, mode, autoComplete } = props;

  const CustomTag = props.component ?? 'input';

  const [field, meta, helpers] = useField(props);

  const { value } = field;
  const { error, touched } = meta;

  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => setIsFocus(true);
  const valueLengthCompare = props.type === 'number'
    ? (value?.toString().length > 0)
    : (value?.toString().trim().length > 2);
  const showFeedback = (!!isFocus && valueLengthCompare) || touched;

  const addNumericProps = () => {
    if (mode === 'numeric') {
      const maxLength = maxValue.toString().length;

      // ** в разработке ** ввод цены с копейками
      // const reMatch = props.name === 'price' ? /^\d*$|^\d+\.?(?:\d?|\d{1,2})$/ : /^\d*$/;
      // const reReplace = props.name === 'price' ? /\D*(\d)(\d*\.?\d{0,2}).*/ : /\D/;
      // const reReplacement = props.name === 'price' ? '$1$2' : '';

      return {
        ...field,
        onChange: (e) => {
          const currentLength = e.target.value.toString().length;

          if (currentLength > maxLength) {
            e.target.value = maxValue;
            helpers.setValue(maxValue);
          }
          if (!e.target.value.match(/^\d*$/)) {
            e.target.value = e.target.value.replace(/\D/, '');
          }
          helpers.setValue(e.target.value);
        },
      };
    }
    return field;
  };

  return (
    <>
      <CustomTag
        className={clsx('form-control', {
          'is-invalid': showFeedback && error,
          'is-valid': showFeedback && !error,
        })}
        type={type ?? 'text'}
        inputMode={mode}
        autoComplete={autoComplete ?? 'off'}
        onFocus={handleFocus}
        {...props}
        {...addNumericProps()}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {showFeedback ? (
        <div className="invalid-feedback position-absolute ps-1">
          {error ?? ''}
        </div>
      ) : null}
    </>
  );
}
