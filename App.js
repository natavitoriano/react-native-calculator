import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
  const [ displayValue, setDisplayValue ] = useState('0');
  const [ clearDisplay, setClearDisplay ] = useState(false);
  const [ operation, setOperation ] = useState(null);
  const [ values, setValues ] = useState([0, 0]);
  const [ current, setCurrent ] = useState(0);

  const addDigit = n => {
    const clear = displayValue === '0'
      || clearDisplay;

    if(n === '.' && !clear
    && displayValue.includes('.')) return

    const currentValue = clear ? '' : displayValue
    const dValue = currentValue + n
    setDisplayValue(dValue);
    setClearDisplay(false);

    if(n !== '.') {
      const newValue = parseFloat(dValue);
      const val = [...values];
      val[current] = newValue;
      setValues(val);
    }
  }

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  const addOperation = op => {
    if(current === 0){
      setOperation(op);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = op === '=';
      const val = values;

      try{
        val[0] = eval(`${val[0]} ${operation} ${val[1]}`);
      } catch(e) {
        val[0] = value[0];
      }

      val[1] = 0;
      setDisplayValue(`${val[0]}`);
      setOperation(equals? null : op);
      setCurrent(equals? 0 : 1);
      setClearDisplay(!equals);
      setValues(val);     
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Display value={displayValue} operation={operation}/>
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearMemory}/>
        <Button label='/' operation onClick={addOperation}/>
        <Button label='7' onClick={addDigit}/>
        <Button label='8' onClick={addDigit}/>
        <Button label='9' onClick={addDigit}/>
        <Button label='*' operation onClick={addOperation}/>
        <Button label='4' onClick={addDigit}/>
        <Button label='5' onClick={addDigit}/>
        <Button label='6' onClick={addDigit}/>
        <Button label='-' operation onClick={addOperation}/>
        <Button label='1' onClick={addDigit}/>
        <Button label='2' onClick={addDigit}/>
        <Button label='3' onClick={addDigit}/>
        <Button label='+' operation onClick={addOperation}/>
        <Button label='0' double onClick={addDigit}/>
        <Button label='.' onClick={addDigit}/>
        <Button label='=' operation onClick={addOperation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
