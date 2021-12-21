"use strict"; // 엄격한 문법 검사

/**
 * 개인이력카드 고정형 데이터 치환
 * 
 * @desc 개인이력카드 새 작성건 및 수정사항을 저장할 시 화면상에 올라와있는 FORM으로 부터 데이터를 받아
 * 		JSON 데이터 형태로 치환한다 내용이 없는 폼은 치환하지 않음
 * 
 * @return JSON Object submitDataObj : 치환한 고정형 데이터를 JSON.pasre 하여 리턴
 */
var personalHistoryGetData = function(){
	var userDataObjArr = [];
	var userDataObjPlainText = "";
	
	$(".user-info-table1, .user-info-table2").find("input:not(input[name='file']), select").each(function(){ // 유동 테이블 두곳 루프 돌면서 데이터 획득
		
		var nowLoopData = this;
		var nowLoopId = $(nowLoopData).attr("id")+"";
		var nowLoopValue = $(nowLoopData).val()+"";
		
		if(nowLoopId=="userEmail"){
			var emailDomain = $("#emailDomain").val();
			if(emailDomain==null){
				emailDomain="";
			}
			nowLoopValue = nowLoopValue + emailDomain;
		}
		
		
		var nowDataPlainText = '"' + nowLoopId + '":"' + nowLoopValue + '"';
		
		var isNew = $("#userIdx").val() == ""?true:false;
		
		var isImg = (nowLoopId == "imageFile") ? true: false;
		
		if(nowLoopValue == "" || !isNew && nowLoopId == "userSocialSecunum" || isImg){ // 해당 키에 내용이 없으면 전송 데이터에서 제외(루프는 진행) || 수정모드시 주민등록번호 전송 제외
			return true;
		}else{
			userDataObjArr.push(nowDataPlainText);
		}
		
	});
	
	userDataObjPlainText = "{" + userDataObjArr.join(",") + "}";
	
	
	//JSON parsing 하면 key(String) : value(array) 형태로 넘어가서
	//매퍼에서 변수 사용시 변수명 뒤에 [0] 붙혀야함
	// 이름~주소까지의 정보
	console.log("userDataObjPlainText 시작" + userDataObjPlainText + "userDataObjPlainText 끝");
	var submitDataObj = JSON.parse(userDataObjPlainText);
	
	console.log("submitDataObj 시작" + submitDataObj + "submitDataObj 끝");
	
	return submitDataObj;
}



/**
 * 개인이력카드 유동형 데이터 치환
 * 
 * @desc 유동테이블의 정보를 데이터 형태로 치환한다.
 * 
 * @return JSON Object flexibleDataObj : 치환한 유동형 데이터를 JSON.pasre 하여 리턴
 */
var flexibleTableGetData = function(){
	
	var dataPlainText = "[";
	
	$(".flexibleTable").find("tbody").find("tr").each(function(i){ // 유동 테이블 반복하며 데이터 획득
		
		var $trSelf = $(this);
		var tbName = $trSelf.parent().parent().attr("tb"); 
		
		if(i != 0) dataPlainText += ",";
		var trDataText = "{";
		
		$trSelf.find("input, select, textarea").each(function(j){
			
			var $tdSelf = $(this);
			
			var key = $tdSelf.attr("data");
			var val = htmlCharRun($tdSelf.val()); // html 특수문자 치환
			
			if(j == 0) trDataText += '"tbName":"' + tbName + '"';
			
			if(val == "") return true; // 값이 비어있으면 굳이 만들지 않아도 되기때문에 다음 루프로 넘김
			
			trDataText += ",";
			trDataText += '"' + key + '":' + '"' + val + '"';
			
		});
		
		trDataText += "}";
		dataPlainText += trDataText;
		console.log(dataPlainText);
	}); // tbody
	
	dataPlainText += "]";
	
	var flexibleDataObj = JSON.parse(dataPlainText);
	console.log(flexibleDataObj);
	return flexibleDataObj;
};



/**
 * 불러오기시 리스트 가져오기
 * 
 * @desc 우측 상단의 버튼 클릭시 해당 함수를 호출함
 * 		불러오기 창에 걸려있는 조건을 기준으로 조회 할 데이터를 AJAX로 데이터를 요청
 * 
 * @map getData : AJAX 요청하여 얻은 정보를 리턴
 */
var ajaxRequestRegisterList = function(){
	
	loading("ON");
	
	var getData = [];
	
	var nowPage = parseInt($("#userInfoPageNo").val());
	var dataSize = parseInt($("#userInfoDataSize").val());
	
	var prevLimit = parseInt((nowPage - 1) * dataSize);
	var laterLimit = parseInt(nowPage * dataSize);
	
	
	var userGender = $("input[name='userGender']").val();
	if(userGender==undefined){
		console.log(userGender=="undefined");
		userGender=null;
	}
	
	//--------------- keywords 데이터 치환 start
	var keywords = "";
	
	$(".keyword-text").each(function(){
		var text = $(this).text();
		if(text!=null) text += ",";
		keywords += text;
		console.log(keywords);
	});
	
	keywords = keywords.substr(0,keywords.length-1); // text 마지막 ',' 를 잘라준다
	
	var reqData = {
			"userListSearchPeriod" : $("#userListSearchPeriod").val() // 검색 조건
			, "userListSearchWord" : $("#userListSearchWord").val() // 검색어
			, "userCareerLength" : $("#userCareerLength").val() // 조회경력
			, "keywords" : keywords // 조회 키워드
			, "prevLimit" : prevLimit // 조회 시작 row
			, "dataSize" : dataSize // 조회 끝 row
			, "laterLimit" : laterLimit
			, "userGender" : userGender
			, "userMaritalStatus" : $("#maritalSelect").val()
			, "userAddress" : $("#addressSelect").val()
	}
	console.log(reqData);
	
	$.ajax({
		url: "./personalHistory/userList",
		type: "POST",
		data: reqData,
		dataType: "json",
		async: false, // 비동기 -> 동기
		success: function(data){
			getData = data.list;
			$("#userInfoTotalCnt").val(data.totalCnt);
			$(".search-cnt-cnt").html(data.totalCnt);
		},
		error: function(){
			alert("error");
		},
		complete: function(){
			loading("OFF");
		}
	});
	console.log(getData);
	
	return getData;
};





/**
 * 개인 이력카드 저장
 * 
 * @desc 데이터화 된 정보를 AJAX로 보내 저장한다.
 * @param submitDataObj : 고정 데이터를 치환해주는 personalHistoryGetData() 메소드와
 * 		유동형 데이터를 치환해주는 flexibleTableGetData() 메소드의 두 결과값을 받음
 */
var personalHistoryRegisterAjaxSend = function(submitDataObj){
	
	loading("ON");
	
	var userIdxVal = $("#userIdx").val();
	var userName = $("#userName").val(); 
	// ajax로 파일업로드를 하기위해 FormData생성
	var formData = new FormData();
	var inputFile = $("input[name='file']");
	var file = inputFile[0].files
	// formData에 데이터를 넣어 전송한다
	formData.append("file",file[0]);
	formData.append("userName",userName);
	formData.append("userIdx",userIdxVal);
		
	var userIdxObj = {"userIdx":userIdxVal}; // 치환된 배열 데이터를 key를 줌
	var submitDataObj = $.extend( submitDataObj, userIdxObj); // 전송하기 위해 고정데이터와 유동데이터 합침
	
	var url = "";
	if(isEmpty(userIdxVal)){ // 새 작성을 저장하는 경우
		
		url = "./personalHistory/registerUser";
		
	}else{ // 기존 작성된 이력을 수정저장하려는 경우
		
		url = "./personalHistory/registerUserUpdate";
		
		
	}
	
	$.ajax({
		url: url,
		type: "POST",
		data: submitDataObj,
		async: false,
		dataType: "json",
		success: function(data){
			var userIdx = data.userIdx;
			$("#userIdx").val(userIdx);
			var errorCode = data.errorCode;
			var errorMsg = data.errorMsg;
			console.log(submitDataObj);
			
			if(url == "./personalHistory/registerUserUpdate"){
				if(file[0]==null){						// 이미지를 선택하지 않았다면 이미지 수정은 건너뛴다
					alert("작성한 내용이 저장되었습니다.");
					userListPagingView();
					modeChange("UPDATE");
					return true;
				}
				$.ajax({
					url:"./personalHistory/imgUpdate",
					type:"post",
					data:formData,
					processData: false,
					contentType: false,
					success:function(){
						$("input[name='file']").val("");
						console.log("파일 업데이트 성공");
					}
				});
			}
			
			if(isEmpty(errorCode)){
				
				if(url == "./personalHistory/registerUser"){
					if(file[0]==null){						// 이미지를 선택하지 않았다면 이미지 삽입은 건너뛴다
						alert("작성한 내용이 저장되었습니다.");
						userListPagingView();
						modeChange("UPDATE");
						return true;
					}
					$.ajax({
						url:"./personalHistory/imgInsert",
						data:formData,
						type:"post",
						processData: false,
						contentType: false,
						success:function(){
							$("input[name='file']").val("");
							console.log("파일 저장 성공");
						}
					})
				}
				
				alert("작성한 내용이 저장되었습니다.");
				userListPagingView(); // 리스트 새로 로드 
				modeChange("UPDATE"); // 저장 후 상단 상태 변경
				
			}else{
				alert(errorMsg);
				return false;
			}
		},
		error: function(){
			alert("error");
		},
		complete: function(){
			loading("OFF");
		}
	});
	
}


/**
 * [ + ] 행 추가 버튼 기능
 * 
 * @desc 여러 테이블에서 같이 사용하는 로직이기 때문에 기준이 되는 오브젝트를 받음
 * @param $eveObj : 
 */
var addRowBtnEve = function($eveObj){
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	var $tbodyObj = $eveObj.parent().prev().find("tbody");
	var firstRowText = "<tr>" + $tbodyObj.find("tr:first-child").html() + "</tr>";
	
	$tbodyObj.append(firstRowText);
	
	var $addTr = $tbodyObj.find("tr:last-child");
	
	$addTr.append(btnStr); // 버튼 추가
	flexibleTableTrEve(); // 추가된 삭제버튼에 이벤트 할당
	
	$addTr.find("textarea").text("").height(30);
	$addTr.find(".dateInput").attr("id","").removeClass('hasDatepicker').datepicker(); // 데이트피커 재정의
}


/**
 * 유동 테이블의 row 삭제 이벤트 재정의
 * 
 * @desc 유동 데이터 테이블의 행이 추가 될 경우 해당 행과 다른 모든 행에 삭제 이벤트를 재 정의 해준다.
 */
var flexibleTableTrEve = function(){
	
	$(".removeTrBtn").unbind().click(function(){
		var $btnSelf = $(this);
		var $parentTr = $btnSelf.parent();
		var $parentTbody = $parentTr.parent();
		
		$parentTr.remove();
	});
	
	$(".flexibleTable").find("tbody").find("tr").unbind().hover(function(){
		var $trSelf = $(this);
		var $childRemoveBtn = $trSelf.find(".removeTrBtn");
		
		$childRemoveBtn.css("display","block");
	},function(){
		var $trSelf = $(this);
		var $childRemoveBtn = $trSelf.find(".removeTrBtn");
		
		$childRemoveBtn.css("display","none");
	});
	
}




/**
 * 작성창 초기화
 * 
 * @desc 새로작성 및 초기화 버튼을 누를 시 비어있는 화면을 만듬
 */
var resetInput = function(){
	var notElementId = "#userIdx, #userInfoTotalCnt, #userInfoDataSize, #userInfoPageSize, #userInfoPageNo, #personalZipcodeSearchBtn";
	var $flexibleTable = $(".flexibleTable");
	$("input, select").not(notElementId).val("");
	$("textarea").not(notElementId).text("");
	
	$flexibleTable.find("tbody").find("tr:not(:first-child)").remove();
	$flexibleTable.find(".dateInput").attr("id","").removeClass('hasDatepicker').datepicker();
	$("textarea").each(function(){resize($(this));}) // 새로 불러온 정보 textarea 리사이징
};






/**
 * 리스트 조회
 * 
 * @desc 불러오기 버튼 눌렀을 시 팝업에 기존 등록 정보들 가져옴 
 */
var getRegisterList = function(){
	
	var table = $(".pop-register-list-pannel table");
	table.html("");
	table.append("<thead>" +
					"<tr>"+
						"<td>등록번호</td>"+
						"<td>성명</td>"+
						"<td>소속회사</td>"+
						"<td>부서</td>"+
						"<td>성별</td>"+
						"<td>경력</td>"+
						"<td>등록날짜</td>"+
					"</tr>"+
				"</thead>"+
			"<tbody>");
	var resultData = ajaxRequestRegisterList(); // ajax 요청하여 뿌릴 데이터 얻음
	var resultLen = resultData.length;
	var resultBoolean; // 검색 결과가 잇으면 true, 없으면 false
	
	var listText = "";
	
	console.log(resultData)
	for(var i = 0; i < resultLen; i++){ // 얻은 데이터 리스트를 html dom 형태로 변환 / 불러오기 검색 결과를 화면에 뿌려줌
		var trText = "<tr>";
			trText += "<td>" + (isEmpty(resultData[i].USER_IDX) == true?"":resultData[i].USER_IDX) + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].USER_NAME) == true?"":resultData[i].USER_NAME) + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].USER_COMP) == true?"":resultData[i].USER_COMP) + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].USER_DEPT) == true?"":resultData[i].USER_DEPT) + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].USER_SEX) == true?"":resultData[i].USER_SEX) + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].CAREER_DATE) == true?"0":resultData[i].CAREER_DATE)+ "년차" + "</td>";
			trText += "<td>" + (isEmpty(resultData[i].USERREGISTERDATE) == true?"":resultData[i].USERREGISTERDATE) + "</td>";
		
		trText += "</tr>";
	
		listText += trText;
	}
	
	
	if(resultLen == 0){ // 조회된 정보가 없으면 조회된 정보가 없음을 알리는 메세지 1row 추가
		var trText = "<tr>";
		trText += '<td rowspan="5">조회된 정보가 없습니다.</td>';
		trText += "<tr>";
		listText += trText;
		
		resultBoolean = false;
	} else {
		resultBoolean = true;
	}
	
	
	table.append(listText);
	table.append("</tbody>")
	
	// 리스트가 재 로드 된 후 추가된 obj에 이벤트 재 정의
	table.find("tr").unbind().click(function(){
		
		if(resultBoolean) { // 조회 데이터가 있을때만 실행
		
			var conResult = confirm("작성 중이던 내용이 있다면 저장 후 불러오십시오.\n 이 정보를 가져오시겠습니까?");
			
			if(!conResult) return false;
			
			resetInput();
			
			var $eveTrObj = $(this); // this = 클릭한 리스트 한 개의 정보
			var userIdx = $(this).find("td:first-child").text(); // 클릭한 리스트의 등록 번호를 저장
			
			var registerData = getRegisterData(userIdx);
		}
	});
}





/**
 * 정보 조회
 * 
 * @desc 불러오기시 데이터 조회하여 폼에 뿌려줌 / index 페이지에서 여기로 이동
 */
var getRegisterData = function(userIdx){
	loading("ON");
	
	var getData;
	// 테이블명 가져오기
	var tbNames = [];
	var $flexibleTable = $(".flexibleTable");
	$flexibleTable.each(function(){
		var tbName = $(this).attr("tb");
		tbNames.push(tbName);
	});
	
	var sendData = {
			"userIdx" : userIdx
			, "tbNames" : JSON.stringify(tbNames)
	};
	
	$.ajax({
		url: "./personalHistory/getRegisterData",
		type: "POST",
		data: sendData,
		dataType: "json",
		async: false, // 비동기 -> 동기
		success: function(data){
			console.log("data : " + data);
			getData = data; // 여기 부분 오류 - lombok 설치가 제대로 이루어지지 않아 get,set 메서드 실행 안되는 오류 발생
			$.ajax({
				url:"./personalHistory/getUserImg/" + userIdx,
				type: "get",
				async: false,
				success:function(data){
					var imgObj = {image : data};
					getData = $.extend(getData,imgObj);
					var imgName = data.imgName;
					if(imgName==null){
						$("#thumbNail").removeAttr("src");
					}else{
						$("#thumbNail").attr("src","../resources/img/upload/" + imgName);
					}
				}
			});
			
		},
		error: function(){
			alert("error");
		},
		complete: function(){
			loading("OFF");
		}
	});
	console.log("DB에서 가져온 데이터 : " + getData);
	
	// 가져온 데이터 폼에 뿌려주기
	
	
	var isNew = $("#userIdx").val() == ""?true:false;
	
	$("#userSocialSecunum").val("0000000000000");
	
	// 고정 데이터폼
	if(getData != 'undefined' && getData != null) {
		var fixedData = getData.fixedData[0];
		for (var key in fixedData) {
			
			//var val = eval("(fixedData." + key + ")"); -> eval : 사용하면 안좋은 기능이므로 아래쪽 코드로 수정
			//$("#"+(eval("convertData."+key)+"")).val(val);
			
			var val = fixedData[key];
			var target = convertData[key];
			$("#"+target).val(val);
			
			console.log("userEmail : " + getData.fixedData[0].USER_EMAIL);
			
			// 이메일 input 박스에 넣기
			var fullEmail = getData.fixedData[0].USER_EMAIL;
			
			if(!fullEmail.isEmpty) {
				var email = fullEmail.split("@");
				$("#userEmail").val(email[0]);
				$("#emailDomain").val("@" + email[1]);
			}
		}
	}
	
	// 유동 데이터폼
	$(".flexibleTable").each(function(){
		
		var $loopTable = $(this);
		var $loopTbody = $loopTable.find("tbody"); 
		var tbName = $loopTable.attr("tb");
		
		var $tbodyFirstTr = $loopTbody.find("tr:first-child");
		var trText = $tbodyFirstTr.html();
		
		
		//var nowFlexibleData = eval("getData." + tbName); badcoding
		var nowFlexibleData = getData[tbName];
		var nowFlexibleDataLen = nowFlexibleData.length; 
		
		$loopTbody.find("tr").remove(); // tr 요소들 전부 삭제 
		
		//form 복사하여 추가
		for(var i = 0; i < nowFlexibleDataLen; i++){
			$loopTbody.append("<tr>" + trText + "</tr>");
		}
		
		for(var i = 0; i < nowFlexibleDataLen; i++){
			var nowData = nowFlexibleData[i];
			for (var key in nowData) {
				//var val = eval("(nowData." + key + ")"); badcoding
				var val = nowData[key];
				
				var $inputObj = $loopTbody.find("tr").eq(i).find("."+key);
	
				var tagName = $inputObj.prop('tagName');
				
				if(tagName == "INPUT"){
					val = $inputObj.val(val);
				}else if(tagName == "TEXTAREA"){
					val = $inputObj.text(val);
				} else if(tagName == "SELECT") { // 컴포넌트가 select면 옵션 선택
					val = $inputObj.val(val);
				}
				
			}
		}
		
		
	});
	
	var btnStr = '<button style="display:none;" class="removeTrBtn">-</button>';
	
	var $flexibleTrs = $(".flexibleTable").find("tbody").find("tr").not(":first-child");
	$flexibleTrs.append(btnStr);
	
	flexibleTableTrEve(); // 추가된 삭제버튼에 이벤트 할당
	modeChange("UPDATE"); // 불러오기 후 상단 상태 변경
	$flexibleTable.find(".dateInput").attr("id","").removeClass('hasDatepicker').datepicker(); // datePicker 이벤트 정의
	$("textarea").each(function(){resize($(this));}) // 새로 불러온 정보 textarea 리사이징
	$("select").find("option:selected").prop('selected',true);
	
};



/**
 * 데이터 매칭
 * 
 * @desc DB 상의 컬럼명과 데이터 class 명과 매칭 시켜줌
 */
var convertData = {
		"USER_ADDRESS": 			"userAddress"
		, "USER_ARMY_SERV": 		"userArmyServ"
		, "USER_ARMY_SERV_PERIOD":	"userArmyServPeriod"
		, "USER_COMP": 				"userComp"
		, "USER_COMP_ENTERDATE": 	"userCompEnterdate"
		, "USER_DEPT": 				"userDept"
		, "USER_ZIPCODE": 			"userZipcode"
		, "USER_EMAIL": 			"userEmail"
		, "USERIDX": 				"userIdx"
		, "USER_MARITAL_STATUS": 	"userMaritalStatus"
		, "USERNAME": 				"userName"
		, "USER_REGISTER_DATE": 	"userRegisterDate"
		, "USER_ARMY_SERV_ENTER":	"userArmyServEnter"
		, "USER_ARMY_SERV_LEAVE": 	"userArmyServLeave"
		, "USER_SEX": 				"userSex"
		, "USER_SOCIAL_SECUNUM": 	"userSocialSecunum"
		, "USER_SPOT": 				"userSpot"
		, "USER_TELNUM_WIRED": 		"userTelnumWired"
		, "USER_TELNUM_WIRELESS": 	"userTelnumWireless"
		, "EDU_SCHOOL_NAME": 		"eduSchoolName"
		, "EDU_STATUS": 			"eduStatus"
		, "EDU_YEAR": 				"eduYear"
		, "EDU_MONTH": 				"eduMonth"
		, "QUALIFI_NAME": 			"qualifiName"
		, "QUALIFI_GETDATE": 		"qualifiGetdate"
		, "CAREER_COMP_NAME": 		"careerCompName"
		, "CAREER_ENTERDATE": 		"careerEnterdate"
		, "CAREER_LEAVEDATE": 		"careerLeavedate"
		, "CAREER_SPOT": 			"careerSpot"
		, "CAREER_RESPONSIB": 		"careerResponsib"
		, "TRAINING_NAME": 			"trainingName"
		, "TRAINING_STARTDATE": 	"trainingStratdate"
		, "TRAINING_ENDDATE": 		"trainingEnddate"
		, "TRAINING_AGENCY": 		"trainingAgency"
		, "LICEN_NAME": 			"licenName"
		, "LICEN_SKILL_LEVEL": 		"licenSkillLevel"
		, "SKILL_PROJECT_NAME": 	"skillProjectName"
		, "SKILL_STARTDATE": 		"skillStartdate"
		, "SKILL_ENDDATE": 			"skillEnddate"
		, "SKILL_CUSTOMER_COMP": 	"skillCustomerComp"
		, "SKILL_WORK_COMP": 		"skillWorkComp"
		, "SKILL_INDUSTRY": 		"skillIndustry"
		, "SKILL_APPLIED": 			"skillApplied"
		, "SKILL_ROLE": 			"skillRole"
		, "SKILL_MODEL": 			"skillModel"
		, "SKILL_OS": 				"skillOS"
		, "SKILL_LANG": 			"skillLang"
		, "SKILL_DBMS": 			"skillDBMS"
		, "SKILL_TOOL": 			"skillTool"
		, "SKILL_COMM": 			"skillComm"
		, "SKILL_ETC": 				"skillETC"
	    , "HOBBY_NAME":				"hobbyName"
	    , "HOBBY_CONTINUEDATE":		"hobbyContinuedate"
	    , "HOBBY_WEEKTIME":			"hobbyWeektime"
}




/**
 * 모드 전환
 * 
 * @desc 작성 모드를 전환해 준다.
 * 
 * @param string mode : "NEW"를 받으면 새 작성모드로 전환,
 * 		"UPDATE"를 받으면 수정모드로 전환
 */
var modeChange = function(mode){
	var $topHeaderStatus = $(".top-header-pannel").find("h5");
	var userIdx = $("#userIdx").val();
	var $userSocialSecunum = $("#userSocialSecunum");
	var $userInfoListPannel = $(".user-info-list-pannel");
	
	if(mode == "NEW"){
		$topHeaderStatus.text("※ 새 이력 작성");
		$("#userIdx").val("");
		$userSocialSecunum.prop("disabled",false);
		$userInfoListPannel.css("background-color","#ebf2f1");
	}else if(mode == "UPDATE"){
		$topHeaderStatus.text("※ 등록번호 : " + userIdx + " (수정)");
		$userSocialSecunum.prop("disabled",true);
		$userInfoListPannel.css("background-color","#ebf2f1");
	}
}

/**
 * 유효성 검사
 * 
 * @desc 사용자가 개인이력카드 등록 및 수정 시 등록 가능한 정보를 입력 하였는지 검사하여
 * 		잘못된 부분이 있으면 메세지 알림 후 해당 폼으로 포커스
 */
var regexAndEmptyCheck = function() {
	var val;
	var $obj;
	var regExp;
	var regResult;
	
	var isNew = $("#userIdx").val() == ""?true:false;
	
	// 이름
	$obj = $("#userName");
	val = $obj.val().trim();
	if (val == "") {
		if(!alert("이름은 필수 입력 사항입니다.")) $obj.focus();
		return false;
	};
	
	// 주민등록번호
	if(isNew){ // 새 이력 작성인경우 주민등록번호 유효성 검사
		
		$obj = $("#userSocialSecunum");
		val = $obj.val().trim();
		regExp = new RegExp("^\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|[3][01])\\-?[1-4][0-9]{6}$");
		if (val == ""){
			if(!alert("주민등록번호는 필수 입력 사항입니다.")) $obj.focus();
			return false;
		};
		regResult = regExp.test(val);
		if(!regResult){
			if(!alert("잘못 된 주민등록번호 입니다.")) $obj.focus();
			return false;
		}
				
	}
	
	// 휴대전화번호
	
	$obj = $("#userTelnumWireless");
	val = $obj.val().trim();
	regExp = /^\d{3}-\d{3,4}-\d{4}$/;
	regResult = regExp.test(val);
	if(!regResult && !isEmpty(val)){
		if(!alert("잘못 된 휴대전화번호 입니다.")) $obj.focus();
		return false;
	}
	
	
	// 유선전화번호
	
	$obj = $("#userTelnumWired");
	val = $obj.val().trim();
	regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
	regResult = regExp.test(val);
	if(!regResult && !isEmpty(val)){
		if(!alert("잘못 된 전화번호 입니다.")) $obj.focus();
		return false;
	}
	
	//이미지
	var inputFile = $("input[name='file']");
	var file = inputFile[0].files
	var fileSize = '';
	if(!isEmpty(file[0])){
		
		fileSize=file[0].size;
		var fileName = inputFile.val()
		var extension = fileName.substr(fileName.lastIndexOf("."),fileName.length)
		if(file[0]==null){
			alert("사진은 필수 입니다.")
			return false;
		}
		
		if(!checkExtension(extension,fileSize)){
			return false;
		}
		
	}else{
		return true;
	}
	// 이메일
	var domain = $("#emailDomain").val();
	if(domain=='직접입력'){
		alert("직접입력")
		$obj = $("#userEmail")
		val = $obj.val().trim();
		regExp = /^[0-9a-zA-Z]$/;
		regResult = regExp.test(val);
		if(!regResult && !isEmpty(val)){
			if(!alert("잘못 된 이메일 입니다.")) $obj.focus();
			return false;
		}
		$obj = $("#userDomain1")
		val = $obj.val().trim();
		regExp = /^@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		regResult = regExp.test(val);
		if(!regResult && !isEmpty(val)){
			if(!alert("잘못 된 이메일 입니다.")) $obj.focus();
			return false;
		}
	}else{
		alert("직접입력아님")
		$obj = $("#userEmail");
		val = $obj.val().trim();
		regExp = /^[0-9a-zA-Z]$/;
		regResult = regExp.test(val);
		if(!regResult && !isEmpty(val)){
			if(!alert("잘못 된 이메일 입니다.")) $obj.focus();
			return false;
		}
	}

	
	
	
	return true;
};


/**
 * 리스트 및 페이징 호출
 * 
 * @desc 불러오기창의 폼 데이터 및 검색조건을 기준으로 조회 데이터를 리스트에 뿌리고
 * 		해당 리스트에 맞는 페이징을 테이블 하단에 추가함
 * 		추가된 페이징으로 해당 메소드를 재호출 하여 화면을 재구성함
 */
var userListPagingView = function(nowPage){
	if(isEmpty(nowPage)) $("#userInfoPageNo").val("1");
	else $("#userInfoPageNo").val(nowPage);
	
	// ajax 처리 완료 후 totalcnt 값 생기면
	getRegisterList();
	
	var totalCnt = parseInt($("#userInfoTotalCnt").val());
	var dataSize = parseInt($("#userInfoDataSize").val());
	var pageSize = parseInt($("#userInfoPageSize").val());
	
	$(".pop-paging-pannel").html(paging(totalCnt, dataSize, pageSize , nowPage, "userListPagingView"));
	
}

//연차별 인원 수
function getUserCountByCareerDate(result){
	console.log(result);
	var table = $(".pop-register-list-pannel table");
	var length = result.length;
	var listText="";
	
	table.html("");
	table.append("<thead>" +
				"<tr>"+
					"<td>연차</td>"+
					"<td>인원</td>"+
				"</tr>"+
				"</thead>"+
				"<tbody>");
	for(var i = 0; i < length; i++){
		var trText = "<tr>";
		
			trText += "<td>" + (isEmpty(result[i].CAREER_DATE) == true?"0":result[i].CAREER_DATE)+ "년차" + "</td>";
			trText += "<td>" + (isEmpty(result[i].COUNT) == true?"":result[i].COUNT)+ "명" + "</td>";
			trText +="</tr>";
		
			listText += trText;
	}
	table.append(listText);
	table.append("</tbody>");
}

//이미지 파일 확장자 체크
function checkExtension(fileName,fileSize){
	var regEx = new RegExp("(.*?)\.(bmp|gif|jpg|jpeg|png)$");
	var maxSize = 5 * 1024 * 1024;	//5mb
	
	if(fileSize>maxSize){
		alert("최대용량은 5Mb입니다.")
		return false;
	}
	
	if(!regEx.test(fileName)){
		alert("업로드는 이미지 파일만 가능합니다.")
		return false;
	}
	return true;
}
