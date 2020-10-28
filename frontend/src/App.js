import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import ListScreen from './screens/ListScreen';
import EditListScreen from './screens/EditListScreen';


 


const App = () => {

  return (
    <Router>
                              <Route render={({history})=><Header history={history}/>}/>

      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/shoppingList' component={ShoppingListScreen} />
          <Route path='/lists' component={ListScreen} exact/> 
          <Route path='/lists/:id/edit' component={EditListScreen} />
          <Route path='/' component={ListScreen} exact/> 
        </Container> 
      </main>
    </Router>
 
  );
}

export default App;
 