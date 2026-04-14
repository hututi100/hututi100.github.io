
/* JWT 디코딩 함수 */
      function decodeJWT(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload);
      }

      /* 로그인 성공 시 실행되는 함수 */
      function handleCredentialResponse(response) {
        const responsePayload = decodeJWT(response.credential);

        // 로그인 정보 저장
        localStorage.setItem("user", JSON.stringify(responsePayload));

        // UI 업데이트
        renderUserUI(responsePayload);
      }

      /* 로그아웃 */
      function logout() {
        localStorage.removeItem("user");
        location.reload();
      }

      /* 로그인 상태에 따라 UI를 그리는 함수 */
      function renderUserUI(user) {
        // Google 로그인 버튼 강제 숨김 (렌더링 지연 대비)
const hideGoogleBtn = setInterval(() => {
  const btn = document.querySelector(".g_id_signin");
  if (btn) {
    btn.style.display = "none";
    clearInterval(hideGoogleBtn);
  }
}, 100);


        // 환영 메시지 표시
        document.body.insertAdjacentHTML(
          "afterbegin",
          `
          <div id="welcomeBox" style="padding:10px;">
            <img src="${user.picture}" width="50" style="border-radius:50%; vertical-align:middle;">
            <span style="font-size:18px; margin-left:10px;">환영합니다, ${user.name}님!</span>
          </div>
          `
        );
      }
/* 페이지 로드 시 로그인 상태 확인 */
      window.onload = function () {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          renderUserUI(user);
        }
      };
      
      
      function nightDayHandler(self){
         var target = document.querySelector('body');
        if(self.value === 'night') {
        target.style.backgroundColor='black';
        target.style.color = 'black';
        self.value = 'day';
        } else {
        target.style.backgroundColor='lightblue';
        target.style.color = 'black';
        self.value = 'night';
        }}
      



