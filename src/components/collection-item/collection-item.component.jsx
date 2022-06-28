import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
  //we are simply creating this new function that has props called additem 
  //that will go itno our collection item as the add item function item we need to leverage.
  //and then what we do whenever we actually dispatch or call this function
  //this function will recieve item as the property pass it into our addItem
  //action creater which gives us back that object where the type is equal to add item and the payload
  //is equal to the item we got passed in and then we dispatch that new
  //object into our storee and it will go throough our redux flow
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);