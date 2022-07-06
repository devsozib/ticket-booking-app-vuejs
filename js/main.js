let app = Vue.createApp({
    data:function(){
        return{
          confirmed:false,
          name:"",
          mobile:"",
          appliedCoupon: null,
            couponCode: "",
            coupons: [
              {
                code: "100TAKAOFF",
                discount: 100
              },
              {
                code: "200TAKAOFF",
                discount: 200
              }
            ],

            seatStates: {
                sold: {
                  text: "Sold",
                  color: "#ff0000"
                },
                available: {
                  text: "Available",
                  color: "#fff"
                },
                booked: {
                  text: "Booked",
                  color: "gray"
                },
                selected: {
                  text: "Selected",
                  color: "#00ff00"
                }
              },

              seats: [
                {
                  name: "A1",
                  type: "available",
                  price: 500
                },
                {
                  name: "A2",
                  type: "available",
                  price: 500
                },
                {
                  name: "A3",
                  type: "available",
                  price: 500
                },
                {
                  name: "A4",
                  type: "available",
                  price: 500
                },
                {
                  name: "B1",
                  type: "available",
                  price: 450
                },
                {
                  name: "B2",
                  type: "available",
                  price: 450
                },
                {
                  name: "B3",
                  type: "available",
                  price: 450
                },
                {
                  name: "B4",
                  type: "available",
                  price: 450
                },
                {
                  name: "C1",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C2",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C3",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C4",
                  type: "sold",
                  price: 500
                },
                {
                  name: "D1",
                  type: "available",
                  price: 400
                },
                {
                  name: "D2",
                  type: "available",
                  price: 400
                },
                {
                  name: "D3",
                  type: "available",
                  price: 400
                },
                {
                  name: "D4",
                  type: "available",
                  price: 400
                },
                {
                  name: "E1",
                  type: "available",
                  price: 300
                },
                {
                  name: "E2",
                  type: "available",
                  price: 300
                },
                {
                  name: "E3",
                  type: "booked",
                  price: 300
                },
                {
                  name: "E4",
                  type: "booked",
                  price: 300
                },
                {
                  name: "F1",
                  type: "available",
                  price: 300
                },
                {
                  name: "F2",
                  type: "available",
                  price: 300
                },
                {
                  name: "F3",
                  type: "available",
                  price: 300
                },
                {
                  name: "F4",
                  type: "available",
                  price: 300
                }
              ]
              
        }
    },
    computed:{
      selectedSeats(){
          let selectedSeat = this.seats.filter((item=> item.type==="selected"));
          return selectedSeat;
      },
      totalCost(){
          let ticketCart= 0;
          this.selectedSeats.forEach((seat=>{
            ticketCart = ticketCart+seat.price;
          }))
          if(this.appliedCoupon !== null){
             ticketCart = ticketCart - this.appliedCoupon.discount;
          }
          return ticketCart;
      }
    },
    watch:{

        couponCode(newValue){
             if(newValue.length === 10){
              let matchingCoupon = this.coupons.filter((item)=>item.code === newValue);

              if(matchingCoupon.length == 1){
                this.appliedCoupon = matchingCoupon[0];
                this.couponCode = "";
              }else{
                alert("Enter valid coupon code");
              }
             }
        }

    },
    methods: {
      handleClick(i){
          let clickedSeat = this.seats[i];

          if(clickedSeat.type == "sold" || clickedSeat.type=="booked"){
            alert("You cant not select this seat");
            return;
          }

          if(clickedSeat.type=="available" && this.selectedSeats.length > 2){
            alert("You cant not select more than 3 seats");
            return;
          }
          clickedSeat.type = clickedSeat.type==="selected"?"available":"selected";

          console.log(clickedSeat);
      },
      confirm() {
        if (!this.name || !this.mobile) {
          alert("Please enter name and mobile");
          return;
        }
      
        this.confirmed = true;
      },

      resetData() {
        this.confirmed = false;
        this.name = "";
        this.mobile = "";
        this.appliedCoupon = null;
      
        this.seats.forEach((seat) => {
          if (seat.type === "selected") {
            seat.type = "sold";
          }
        });
      }
    }
});

app.mount("#app");