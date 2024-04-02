// const initialValue = Array.isArray(value) ? value : [min, max];
//   const [localValues, setLocalValues] = useState(initialValue);

//   useEffect(() => {
//     // Update localValues when the external value prop changes
//     setLocalValues(Array.isArray(value) ? value : [min, max]);
//   }, [min, max, value]);

//   const handleValueChange = (newValues: number[]) => {
//     setLocalValues(newValues);
//     if (onValueChange) {
//       onValueChange(newValues);
//     }
//   };