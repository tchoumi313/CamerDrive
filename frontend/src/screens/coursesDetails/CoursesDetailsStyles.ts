import { Dimensions, StyleSheet } from 'react-native';

const CourseDetailsStyle = StyleSheet.create({
  
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 40,
  },
  
  conceptsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  conceptContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom:25,
    width:Dimensions.get("window").width*0.9,
    alignItems:"center",

    //marginVertical: 5,
  },
  conceptText: {
    fontSize: 16,
    color: '#555',
  },
});

export default CourseDetailsStyle;