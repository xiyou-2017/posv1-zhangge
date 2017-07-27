let buildItems=(inputs)=>{
  let allItems=loadAllItems();
  let itemCount=[];
  for(let input of inputs){
    let splitInput=input.split("-");
    let barcode=splitInput[0];
    let count=parseFloat(splitInput[1]||1);
    let cartItem=itemCount.find(cartItem=>cartItem.item.barcode===barcode);
    if(cartItem){
      cartItem.count+=count;
    }
    else{
      let item=allItems.find(item=>item.barcode===barcode);
      itemCount.push({item:item,count:count});
    }
  }
  return itemCount;
}

let buildItemSubtotals=(itemCount)=>{
  return itemCount.map(cartItem=>{
    let promotionType=getPromotionType(cartItem);
    let {subtotal,itemDiscount}=getDiscount(cartItem,promotionType);
    return {cartItem,subtotal,itemDiscount};
  })
}

let getPromotionType=(cartItem)=>{
  let promotions=loadPromotions();
  let promotion=promotions.find(promotion=>promotion.barcodes.includes(cartItem.item.barcode));
  return promotion?promotion.type:' ';
}

let getDiscount=(cartItem,promotionType)=>{
  let freeCount=0;
  if(promotionType=='BUY_TWO_GET_ONE_FREE'){
    freeCount=parseInt(cartItem.count/3);
  }
  let itemDiscount=freeCount*cartItem.item.price;
  let subtotal=cartItem.item.price*(cartItem.count-freeCount);
  return {subtotal,itemDiscount};
}

