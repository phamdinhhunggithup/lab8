var app = new Vue({
    el : "#site",
    data : {
        isLoader        : true,
        isPopup         : false,
        isExercise      : false,
        isSidebar       : false,
        notifiBoxShowId : 1,
        IDexercise      : 1,
        productItem : {
            name      : '',
            amount    : '',
            producer  : '',
            status    : '',
            listColor : []
        },
        exerciseOf2Id    : 0,
        isExerciseOF2    : false,
        isRecomment      : false,
        isButton         : false,
        URLselectCourse  : '',
        nameSelectCourse : '',
        // exercise 2   
        clockStarting    : false,
        intervalClock    : null,
        hourHand         : null,
        munitesHand      : null,
        secondHand       : null
    },
    methods : {
        wrapClassPopup()
        {
            this.isLoader = !this.isLoader;
            this.isPopup = !this.isPopup;
        },
        nextNotifi(e)
        {
            let el = e.target;
            el.parentElement.classList.add('nextNotifi');    
        },
        doneNotifi()
        {
            this.callExercise();
        },
        callExercise()
        {
            this.isPopup = false;
            this.isExercise = true;
        },
        toggleSidebar()
        {
            this.isSidebar = !this.isSidebar;
        },
        // product
        handleCheckNameProd(e)
        {
            let vl_nameProd = e.target.value;
            let error = '';
            if(vl_nameProd.length === 0) {
                error = 'Vui lòng điền tên sản phẩm';
            } else {
                error = '';
                this.productItem.name = vl_nameProd;
            }
            this.$refs.errorNameProd.innerText = error;
        },
        handleCheckAmountProd(e)
        {
            let vl_amountProd = e.target.value;
            let error = '';
            if(vl_amountProd.length === 0) {
                error = 'Vui lòng điền số lượng sản phẩm';
            } else if(vl_amountProd <= 0) {
                error = 'Số lượng sản phẩm phải lớn hơn 0';
            } else {
                error = '';
                this.productItem.amount = vl_amountProd;
            }
            this.$refs.errorAmountProd.innerText = error;
        },
        handleCheckProducer(e)
        {
            let vl_producer = e.target.value;
            let error = '';
            if(vl_producer.length === 0) {
                error = 'Vui lòng điền tên nhà sản xuất';
            } else {
                error = '';
                this.productItem.producer = vl_producer;
            }
            this.$refs.errorProducer.innerText = error;
        },
        handleAddProd()
        {
            let statusProdElement = document.getElementsByName("status-product[]");
            let colorProdElement  = document.getElementsByName("colorProd[]");

            let { productItem } = this;
            // check name prod
            if(productItem.name.length === 0) {
                this.$refs.errorNameProd.innerText = 'Vui lòng điền tên sản phẩm';
                isError = true;
            } else {
                this.$refs.errorNameProd.innerText = '';
                isError = false;
            }
            // check amount
            if(productItem.amount.length === 0) {
                this.$refs.errorAmountProd.innerText = 'Vui lòng điền số lượng sản phẩm';
                isError = true;
            } else if(productItem.amount <= 0) {
                this.$refs.errorAmountProd.innerText = 'Số lượng sản phẩm phải lớn hơn 0';
                isError = true;
            } else {
                this.$refs.errorAmountProd.innerText = '';
                isError = false;
            }
            // check producer
            if(productItem.producer.length === 0) {
                this.$refs.errorProducer.innerText = 'Vui lòng điền tên nhà sản xuất';
                isError = true;
            } else {
                this.$refs.errorProducer.innerText = '';
                isError = false;
            }

            // check status
            let vl_status = '';
            statusProdElement.forEach(el => {
                if(el.checked) {
                    vl_status = el.value;
                }
            });
            if(vl_status.length === 0) {
                this.$refs.errorStatus.innerText = "Hàng cũ hay mới";
                isError = true;
            } else {
                this.productItem.status = vl_status;
                this.$refs.errorStatus.innerText = "";
                isError = false;
            }

            // check color
            let vl_color = [];
            colorProdElement.forEach(el => {
                if(el.checked) {
                    vl_color.push(el.value);
                }
            });
            if(vl_color.length === 0) {
                this.$refs.errorColor.innerText = "Màu gì vậy";
                isError = true;
            } else {
                this.$refs.errorColor.innerText = "";
                this.productItem.listColor = vl_color;
                isError = false;
            }

            if(!isError) {
                this.isExercise = false;
                this.isLoader = true;
                this.redirect("https://longnv.name.vn/");
            }
            event.preventDefault();
        },
        redirect(url)
        {
            window.location.href = url;
        },

        // ====== GENEREL ====== //
        nextExercise(IDexercise)
        {
            this.IDexercise = IDexercise;
        },

        // ====== EXCERCISE 2 =====//
        openExerciseOf2ID(idExerciseOF2ID)
        {
            this.isExerciseOF2 = true;
            this.exerciseOf2Id = parseInt(idExerciseOF2ID);
        },
        closeListExercuseOF2()
        {
            this.isExerciseOF2 = false;
            this.exerciseOf2Id = 0;
        },
        // exercise 2
        openRecommentListCourse()
        {
            this.isRecomment = true;
        },
        selectHrefCourse(url, nameCourse)
        {
            this.isButton = false;
            setTimeout(() => {
                this.URLselectCourse = url;
                this.nameSelectCourse = nameCourse;
                this.isButton = true;
            },800);
        },
        gotoCourse()
        {
            if(this.URLselectCourse.length > 0) {
                this.isExercise = false;
                this.isLoader = true;
                this.redirect(this.URLselectCourse);
            }
        },
        startClock()
        {
            this.hourHand    = this.$refs.data_hour_hand;
            this.munitesHand = this.$refs.data_minute_hand;
            this.secondHand  = this.$refs.data_second_hand;
            this.clockStarting = true;
            this.callClock();
        },
        stopClock()
        {
            this.clockStarting = false;
            this.callClock();
        },
        callClock()
        {
            if(this.clockStarting) {
                this.intervalClock = setInterval(this.setClock,1000);
            } else {
                clearInterval(this.intervalClock);
            }
        },
        setClock(){
            let hourHand    = this.hourHand;
            let munitesHand = this.munitesHand;
            let secondHand  = this.secondHand;
            let currentDate   = new Date();
            let secondsRadio  = currentDate.getSeconds() / 60;
            let minutesRadio  = (secondsRadio + currentDate.getMinutes()) / 60;
            let hoursRadio    = (minutesRadio + currentDate.getHours()) / 12;
            this.setRotation(secondHand, secondsRadio);
            this.setRotation(munitesHand, minutesRadio);
            this.setRotation(hourHand, hoursRadio);
        },
        setRotation (element, rotationRadio)
        {
            element.style.setProperty('--rotation', rotationRadio * 360);
        }
    },
    computed : {
        togglePopupClass()
        {
            return {
                show : this.isPopup
            }
        },
        loadingClass()
        {
            return {
                hide : !this.isLoader
            }
        },
        toggleExerciseClass()
        {
            return {
                "open-content" : this.isExercise
            }
        },
        toggleSidebarClass()
        {
            return {
                custom : this.isSidebar
            }
        },

        // check id exercise item of exercise 2
        toogleClassExerciseOF2()
        {
            return {
                show : this.isExerciseOF2
            }
        },
        // exercise 2 of 2
        toggleClassRecomment()
        {
            return {
                show : this.isRecomment
            }
        },
        buttonToggleSelectCourse()
        {
            return {
                show : this.isButton
            }
        },

    },
    created : function () {
        setTimeout(() => {
            this.wrapClassPopup();
        },900);
        // js
        // setInterval(setClock, );
    },

});