import React, {Component} from 'react';
import Cards, { Card } from 'react-swipe-card'
import { gql, graphql } from 'react-apollo';
import '../styles/SwipeCard.scss';
import InfoModal from './InfoModal';
import ReviewModal from './ReviewModal';
import Restaurant from './Restaurant.js'




class SwipeCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      yesDishes:[],
      currentDish:{},
      cardContentsStyle: {},
      pageID: 1,
      infoModalIsClosed: "App-container container"

    }
    this.swipe = this.swipe.bind(this)
    this.infoModalClosed = this.infoModalClosed.bind(this)
    this.checkIfOpen = this.checkIfOpen.bind(this)
    // console.log("constructor props", this.props );


  }
  componentDidUpdate(prevProps, prevState){
    // console.log("componentDidUpdate state", this.state);
    console.log("componentDidUpdate props", this.props);

    // console.log("currentDish", this.props.DishesListQuery.allDishes[0]);
    // console.log("this.state.currentDish", this.state.currentDish.dishName);
    console.log("componentDidUpdate");
    let cd = this.props.DishesListQuery.dishes.docs[0]
    if (this.state.currentDish.dishName === undefined) {
      console.log("if");
      this.setState((props) =>({
        currentDish: cd
      }))
    }
  }
  swipe(allDishes, item, i, swipe){
    let currentDish = allDishes[i+1]
    if (swipe === "right") {
      // console.log(swipe);
      let addYesDish = this.state.yesDishes.slice()
      addYesDish.push(item)
      console.log("addedDish", addYesDish);
      // console.log("INDEX", i);
      this.setState(() => ({
        yesDishes: addYesDish,
        currentDish: currentDish
      }));

      console.log("swipe currentDish", this.state.currentDish);

    } else {
      console.log(swipe);
      this.setState(() => ({
        currentDish: currentDish
      }));

    }
    console.log("pageID", this.state.pageID);
    console.log("pageID -1 ", this.props.DishesListQuery.dishes.pages -1);

    if (this.state.pageID === this.props.DishesListQuery.dishes.pages - 1 ) {
      console.log("PAGEID IF");
      this.setState({
        pageID: 0
      })
    }
    if ((i+3)% 10 === 0) {
        this.setState({
          pageID: this.state.pageID + 1
        })
        console.log("this.state.pageID", this.state.pageID);
        this.onFetchMore()
    }

  }
  onFetchMore(){
    const  { fetchMore }  = this.props.DishesListQuery;
     fetchMore({
       variables:{
         pageID: this.state.pageID
       },
       updateQuery: (previousResult, { fetchMoreResult }) => {
         console.log("fetchMore");
         console.log("previousResult", previousResult);
         console.log("fetchMoreResult", fetchMoreResult);
         return {
           ...previousResult,
           // Add the new matches data to the end of the old matches data.
           dishes:{
              docs:[
             ...previousResult.dishes.docs,
             ...fetchMoreResult.dishes.docs,
              ],
              page: this.state.pageID,
              pages: this.props.DishesListQuery.dishes.pages,
           },
         };
       },
     });
   }
  cardContentsStyle(){
    console.log("cardContentsStyle");
    this.setState({
      cardContentsStyle: {
        padding: 0
      }
    })
  }
  infoModalClosed(){
    this.setState({
      infoModalIsClosed: "info-modal--closed App-container container",
    })
    console.log("this.state.infoModalIsClosed", this.state.infoModalIsClosed);

  }
  checkIfOpen(dishes){
    console.log("test", dishes);
  }
  render(){
    const {loading, error, dishes} = this.props.DishesListQuery;
    let left = "left"
    let right = "right"
    if (loading) {
        return <p>Loading...</p>
      }
    if (error) {
      return <p>{error.message}</p>
    }
      const allDishes = dishes.docs
      console.log("RENDER", this.props);
    if(dishes){
      this.checkIfOpen(dishes)
      return (

        <div className={this.state.infoModalIsClosed}>

          <Cards
            onEnd={()=>console.log("End")}
            alertLeft={<div>No</div>}
            alertRight={<div>Yes</div>}
            className='card-container'

            >
            {allDishes.map((item, i) =>

                <Card key={i}
                 onSwipeLeft={()=>this.swipe(allDishes, item, i, left)}
                 onSwipeRight={()=>this.swipe(allDishes, item,i, right)}

                 >
                 <div className="card-contents"

                   >
                   <img className="card-image" src={item.photourl} alt="Dish"/>
                   <div className="card-text">
                     <h2>{item.dishName}</h2>
                     <Restaurant
                       restaurantID={item.restaurant_id}
                       />
                   </div>
                   <InfoModal
                     currentDish={this.state.currentDish}
                     restaurantID={this.state.currentDish.restaurant_id}
                     infoModalClosed={this.infoModalClosed}

                     ></InfoModal>
                  </div>
                </Card>
              )}
          </Cards>
          <ReviewModal
              reviewModalClosed={this.reviewModalClosed}
              yesDishes={this.state.yesDishes}

            />
        </div>
      )
    }else {
      return <div>No Dishes</div>
    }
  }


}


// <img className="image" src={item.photourl} alt=""/>

// <Restaurant restaurantID={item.restaurant_id}
//              openClosed={true}
//              showOpenClosed={true}
//
//   />


const dishesListQuery = gql`
  query DishesListQuery($pageID: Int) {
    dishes(pageID: $pageID) {
      docs{
        _id
        dishName
        photourl
        restaurant_id
      }
      page
      pages
    }
  }

`;


SwipeCard = graphql(dishesListQuery,{
  options: ()=>({
    variables:{
      pageID: 1
    }
  }),
  name: 'DishesListQuery'
}
)(SwipeCard);

export default SwipeCard
