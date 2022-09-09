import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
import AnimatedCodeInput from 'react-native-animated-code-input'
const NUMBER_OF_INPUTS = 5

const ReactNativeAnimatedCodeInput = ({
  safeAreaPaddingTop = 25,
  width = 280,
  height = 535,
  style,
  userSelect = 'none',
}) => {
  const [code, setCode] = useState('')

  const onChangeText = useCallback((text) => {
    setCode(text)
  }, [])

  const onSubmit = useCallback((codeValue) => {
    Alert.alert(
      'DONE',
      codeValue,
      [{ text: 'OK', onPress: () => setCode('') }],
      { cancelable: false }
    )
  }, [])
  return (
    <View style={{ marginVertical: 20, alignItems: 'center' }}>
      <View
        style={{
          position: 'relative',
          backgroundColor: '#000000',
          borderWidth: 3,
          borderColor: 'grey',
          width: width,
          height: height,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          userSelect,
        }}
      >
        <View
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#ffde1a',
            width: width - 15,
            height: height - 15,
            borderRadius: 18,
          }}
        >
          <View
            style={[
              {
                width: '100%',
                height: '100%',
                paddingTop: safeAreaPaddingTop,
              },
              style,
            ]}
          >
            <View style={styles.scrollContainer}>
              <Text style={styles.title}>
                react-native-animated-code-input demo
              </Text>

              <View>
                <AnimatedCodeInput
                  value={code}
                  numberOfInputs={NUMBER_OF_INPUTS}
                  onChangeText={onChangeText}
                  onSubmitCode={onSubmit}
                  textColor={'black'}
                  activeCodeContainerStyle={{
                    inputFontSize: 20,
                    customStyle: styles.simplyActiveCodeContainer,
                  }}
                  codeContainerStyle={{
                    inputFontSize: 20,
                    customStyle: styles.simplyCustomCodeContainer,
                  }}
                  cursorStyle={styles.simplyCursorStyle}
                />

                <View style={{ margin: 10 }} />

                <AnimatedCodeInput
                  value={code}
                  numberOfInputs={NUMBER_OF_INPUTS}
                  onChangeText={onChangeText}
                  onSubmitCode={onSubmit}
                  textColor={'black'}
                  activeCodeContainerStyle={{
                    inputFontSize: 20,
                    customStyle: styles.borderActiveCodeContainer,
                  }}
                  codeContainerStyle={{
                    inputFontSize: 20,
                    customStyle: styles.borderCodeContainer,
                  }}
                  cursorStyle={styles.cursorStyle}
                />
                <View style={{ margin: 10 }} />
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              width: '60%',
              top: 0,
              left: '20%',
              height: 25,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: '#000000',
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffde1a',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
  },
  simplyCustomCodeContainer: {
    backgroundColor: '#ffde1a',
    color: '#c1cefa',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    width: 40,
    height: 50,
  },
  simplyCursorStyle: {
    color: 'black',
    marginTop: 22,
  },
  simplyActiveCodeContainer: {
    backgroundColor: '#ffde1a',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    width: 40,
    height: 50,
  },
  borderActiveCodeContainer: {
    backgroundColor: '#ffde1a',
    borderRadius: 50,
    borderColor: '#b2b',
    borderWidth: 2,
    width: 50,
    height: 50,
  },
  borderCodeContainer: {
    backgroundColor: '#ffde1a',
    borderRadius: 50,
    borderColor: '#060054',
    borderWidth: 2,
    width: 50,
    height: 50,
  },
  cursorStyle: {
    color: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  footnote: {
    textAlign: 'center',
    marginBottom: 10,
  },
})

export default ReactNativeAnimatedCodeInput
