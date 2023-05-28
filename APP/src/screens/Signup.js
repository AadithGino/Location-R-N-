import React,{useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../../redux/actions/action';
import Button from '../components/Button';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();

  const SignupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignUp = (values) => {
    dispatch(userSignUpAction(values.name, values.email, values.password));
  };

  const userSignup = useSelector(state => state.userSignUpReducer);
  const { userdata, loading, usersignuperror } = userSignup;

  useEffect(() => {
    if (userdata) {
      navigation.push('Login');
    }
  }, [userdata]);

  return (
    <View style={{ flex: 1, marginHorizontal: 22 }}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={{ marginVertical: 22 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: 'black' }}>
                Create Account
              </Text>
              <Text style={{ fontSize: 16, color: 'black' }}>New to this?</Text>
            </View>

            <View>
              {usersignuperror && (
                <Text style={{ fontSize: 16, color: 'red' }}>{usersignuperror}</Text>
              )}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Name</Text>
              <View style={[styles.inputContainer, touched.name && errors.name && styles.inputError]}>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder="Enter your Name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  style={styles.input}
                />
              </View>
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
              <View style={[styles.inputContainer, touched.email && errors.email && styles.inputError]}>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Enter your email address"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
              <View style={[styles.inputContainer, touched.password && errors.password && styles.inputError]}>
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Enter your password"
                  placeholderTextColor="black"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              
              <Button
              onPress={handleSubmit}
              title="Sign Up"
              filled
            />
            )}

            <View style={styles.loginContainer}>
              <Text style={{ fontSize: 16, color: 'black' }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
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
  input: {
    width: '100%',
    color: 'black',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
    backgroundColor: 'blue',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 6,
  },
};

export default Signup;
