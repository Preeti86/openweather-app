import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY= '46699eb5ebcf527b5236072a90e9c972';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city) {

            this.setState({
                temperature: data.main.temp,
                city: data.name,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the values"
            });
           }
        }
        render() {
        return (
                  <div>
                 <div className="wrapper">
                      <div className="row">
                           <div className="container">
                                <div className="row">
                                     <div className="col-xs-5 title-container">
                               <Titles />
                                     </div>
                                     <div className="col-xs-7 form-container">
                                         <Form getWeather={this.getWeather}/>
                                         <Weather temperature={this.state.temperature}
                                                  city={this.state.city}
                                                  humidity={this.state.humidity}
                                                  description={this.state.description}
                                                  error={this.state.error}
                                                     />
                                            </div>
                                               </div>
                                                </div>
                                                    </div>
                                                        </div>
                                                            </div>
       );
    }
}
export default App;
