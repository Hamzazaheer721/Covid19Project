import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar ,List} from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class countriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: [],
          error: null,
          selectedItem: null,   
        };
        this.response = [];
      }
      componentDidMount() {
        this.API();
      }
      API = () => {
        const apiurl = `https://api.covid19api.com/countries`;
        this.setState({ loading: true });
        //ftech the list of all the countries infected from COVID19 from the above url
        fetch(
          apiurl,
          {method: 'GET',
           redirect: 'follow'
          })
        .then(response => response.json())
          .then(res => {
            this.setState({
                data: res,
                loading: false,
              });
            
            this.response = res;
            //countries are being sorted
            this.response.sort(function(d,c){
              if(d.Country < c.Country) { return -1; }
              if(d.Country > c.Country) { return 1; }
              return 0;
             })

          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
           
      };
    
    
      line = () => {
        return (
          <View
            style={{ height: 1, width: '100%' }}
          />
        );
      };
     //function which navigate from Home screen to Screen 2(CountryDetails)
      nextS(selectedCountry){
        this.props.navigation.navigate("ByCountry",{country: selectedCountry});
      }
      
      //Search Function 
      search = text => {
        this.setState({
          value: text,
        });
        const newData = this.response.filter(item => {
            const itemData = `${item.Country.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData)>-1;
          });
          this.setState({
            data: newData,
          });
        };
      
    


      render(){
          
        if (this.state.loading) {
            return (
              <View style={{ backgroundColor:'#212121', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            );
          }
          return (
            //Search bar to search any country and Flalist is used which is rendering the items which is fetched.
              <View style={{backgroundColor: '#22223A',color: 'red', flex: 1 }}>
               
              <SearchBar 
              
              containerStyle={{marginTop: 30, borderWidth:1 ,backgroundColor: '#feda6a', borderRadius: 10, marginBottom: 10, justifyContent: 'center'}}
           
             
              
              inputContainerStyle={{borderWidth:2,backgroundColor: '#FEDBC4'}}
              round={false} backgroundColor="white" placeholder="Search here" onChangeText={text => this.search(text)} autoCorrect={false} value={this.state.value} />
              
              <FlatList
              style={{backgroundColor: '#373833'}}
                data={this.state.data}
                keyExtractor={(item,index) => {         
                  return index.toString()}}
                  keyboardShouldPersistTaps="always"
                renderItem={({ item,index }) => (
                  <ListItem
                  
                  containerStyle={{backgroundColor: '#22223A'}}
                  titleStyle={{ color: '#ffc107',fontSize: 15, marginLeft: 120, justifyContent: 'center', alignItems: 'center' }}
                  key={item.id}
                    title={`${item.Country}`}
                    onPress={()=> {this.nextS(item.Country,)}}
                  />
                  
                )}
                ItemSeparatorComponent={this.line}
              />
              
            </View>
        )
        }
    }

    export default countriesList