import React from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {userLoginAction} from '../../redux/actions/action';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(3).required('Password is required'),
});

const Login = ({navigation}) => {
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const userLoginData = useSelector(state => state.userLoginReducer);
  const {userdata, loading, userloginerror} = userLoginData;
  const dispatch = useDispatch();

  const handleLogin = values => {
    dispatch(userLoginAction(values.email, values.password));
  };

  React.useEffect(() => {
    if (userdata) {
      navigation.navigate('Home');
    }
  }, [userdata]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <ScrollView>
        <View style={{flex: 1, marginHorizontal: 22}}>
          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,            
                color: 'black',
              }}>
              Login
            </Text>
            <Text style={{fontSize: 16, color: 'black'}}>Welcome Back...</Text>
          </View>

          <View>
            {userloginerror && (
              <Text style={{fontSize: 16, color: 'red'}}>{userloginerror}</Text>
            )}
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={{marginBottom: 12}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 400, marginVertical: 8}}>
                    Email address
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      touched.email && errors.email && styles.inputError,
                    ]}>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Enter your email address"
                      placeholderTextColor={'black'}
                      keyboardType="email-address"
                      style={styles.input}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={{marginBottom: 12}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 400, marginVertical: 8}}>
                    Password
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      touched.password && errors.password && styles.inputError,
                    ]}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Enter your password"
                      placeholderTextColor={'black'}
                      secureTextEntry={isPasswordShown}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordShown(!isPasswordShown)}
                      style={styles.visibilityIcon}>
                      <Text>{isPasswordShown ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <Button
                    onPress={handleSubmit}
                    title="Login"
                    filled
                    style={styles.button}
                  />
                )}
              </>
            )}
          </Formik>

          <View style={styles.signupContainer}>
            <View style={styles.divider} />
            <View style={styles.signupTextContainer}>
              <Text style={{fontSize: 16, color: 'black'}}>New to this ?</Text>
              <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>SignUp</Text>
              </Pressable>
            </View>
            <View style={styles.divider} />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  inputError: {
    borderColor: 'red',
  },
  input: {
    width: '100%',
    color: 'black',
  },
  visibilityIcon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22,
  },
  signupText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 6,
  },
};

export default Login;
