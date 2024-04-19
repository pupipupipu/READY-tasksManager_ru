define(["jquery"], function ($) {
  var CustomWidget = function () {
    var self = this,
      system = self.system;
    this.callbacks = {
      settings: function () {},
      init: function () {
        return true;
      },
      bind_actions: function () {
        return true;
      },
      render: function () {
        let flag = true;

        if (flag) {
          function addButtonOpenClose() {
						flag = false;
            waitForSelector(() => {
              // Листы с нужный классом на странице
              const allLists = document.querySelectorAll(
                ".custom-scroll.control--select--list"
              );

              // Нужный лист менеджеров
              const listManagers = Array.from(allLists).filter(
                (list) => list.children.length > 25
              )[0];

              myCustomButton = document.createElement("button");
              myCustomButton.innerText = "";
              myCustomButton.type = "button";
              myCustomButton.classList.add("button-custom-widget");

							borderLeft = document.createElement('div');
							borderLeft.classList.add("border-myCustomButton-left");

              listManagers.after(myCustomButton);
							myCustomButton.after(borderLeft)

              ///////// Функционал кнопки
              myCustomButton.addEventListener("click", () => {

                if (listManagers.classList.contains("control--select--list")) {
                  listManagers.classList.add("control--select--list-opened");
                  listManagers.classList.remove("control--select--list");
                  listManagers.style.zIndex = "30";
                } else if (
                  listManagers.classList.contains(
                    "control--select--list-opened"
                  )
                ) {
                  listManagers.classList.remove("control--select--list-opened");
                  listManagers.classList.add("control--select--list");
                  listManagers.style.zIndex = "1";
                }
              });
              ///////// Функционал кнопки

              // Создаем стили для кнопки кастомного виджета
              var buttonStyles = document.createElement("style");
              buttonStyles.innerHTML = `
			.button-custom-widget {
				right: -34px;
				top: 0px;
				position: absolute;

				z-index: 11;

				background-color: white;

				width: 60px;
				height: 36px;

				color: black;
				border: 1px solid #e8eaeb;
				border-left: none;
				border-bottom: 1px solid #e8eaeb;
				border-bottom-width: 2px;
				border-radius: 3px;
			}
			
			.border-myCustomButton-left{
				position: absolute;

				width: 0px;
				height: 34px;

				z-index: 15;

				right: -1px;

				border: 1px solid #e8eaeb;
			}
	
			.button-custom-widget:after {
					content: '';
					position: absolute;
					top: calc(50% - 5px);
					width: 6px;
					height: 6px;
					border-bottom: 1px solid #363b44;
					border-right: 1px solid #363b44;
					transform: rotate(45deg);
					margin-left: 7px;
					right: 12px;
					z-index: 1;
			}
	`;

              // Добавляем стили в заголовок документа
              document.head.appendChild(buttonStyles);
            }, ".modal-body__inner-add-task__managers-select");

            // waitForOutSelector(
            //   addButtonOpenClose(),
            //   ".modal-body__inner-add-task__managers-select"
            // );
          }
        }

        addButtonOpenClose();

        /////// Ожидание появления селектора
        function waitForSelector(workFunction, selector) {
          const observer = new MutationObserver((mutationsList, observer) => {
            const targetElementNow = document.querySelector(selector);
            if (targetElementNow) {
              observer.disconnect();
              workFunction();

							if(!flag){
								flag = true;
								waitForOutSelector(
									addButtonOpenClose,
									".modal-body__inner-add-task__managers-select"
								);
							}
            }
          });
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
          });
        }
        /////// Ожидание появления селектора

        /////// Ожидание пропажи селектора
        function waitForOutSelector(workFunction, selector) {
          const observer = new MutationObserver((mutationsList, observer) => {
            const targetElementNow = document.querySelector(selector);
            if (!targetElementNow) {
              observer.disconnect();
              workFunction();
            }
          });
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
          });
        }
        /////// Ожидание пропажи селектора

        return true;
      },
      contacts: {
        selected: function () {},
      },
      leads: {
        selected: function () {},
      },
      onSave: function () {
        return true;
      },
    };
    return this;
  };
  return CustomWidget;
});
