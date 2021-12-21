/**
 * index 페이지 스크립트 파일
 */

// 불러오기창 검색버튼

	$(document).on("click", ".user_list_search_btn", function(){
		userListPagingView(1);
	});
	
	
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
		
		$(".user_paging_pannel").html(paging(totalCnt, dataSize, pageSize , nowPage, "userListPagingView"));
		
	}
	
	/**
	 * 리스트 조회
	 * 
	 * @desc 불러오기 버튼 눌렀을 시 팝업에 기존 등록 정보들 가져옴 
	 */
	var getRegisterList = function(){
		
		var table = $(".user_register_list_pannel table");
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
			
			resultBoolean = true;
		}
		
		
		if(resultLen == 0){ // 조회된 정보가 없으면 조회된 정보가 없음을 알리는 메세지 1row 추가
			var trText = "<tr>";
			trText += '<td rowspan="5">조회된 정보가 없습니다.</td>';
			trText += "<tr>";
			listText += trText;
			
			resultBoolean = false;
		}
		
		
		table.append(listText);
		table.append("</tbody>")
		
		// 리스트가 재 로드 된 후 추가된 obj에 이벤트 재 정의
		
		table.find("tr").unbind().click(function(){
			
			if(resultBoolean) {
			console.log(resultBoolean);
			var conResult = confirm("이 정보를 가져오시겠습니까?");
			
			if(!conResult) return false;
			
			var $eveTrObj = $(this); // this = 클릭한 리스트 한 개의 정보
			var userIdx = $(this).find("td:first-child").text(); // 클릭한 리스트의 등록 번호를 저장
			location.href="./homeMove?userIdx="+userIdx; // 컨트롤러에 userIdx값 전송
			
			}
		});
	}
	
	
	/**
	 * 불러오기시 리스트 가져오기
	 * 
	 * @desc 우측 상단의 버튼 클릭시 해당 함수를 호출함
	 * 		불러오기 창에 걸려있는 조건을 기준으로 조회 할 데이터를 AJAX로 데이터를 요청
	 * 
	 * @map getData : AJAX 요청하여 얻은 정보를 리턴
	 */
	var ajaxRequestRegisterList = function(){
		
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
				$(".search_cnt_cnt").html(data.totalCnt);
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
	
	//연차별 인원보기 버튼 클릭시
	$(document).on("click","#getUserCountByCareerDate",function(){
		var result; 
		
		$.ajax({
			url:"./personalHistory/getUserCountByCareerDate",
			method:"get",
			async: false,
			success:function(data){
				result = data;
			}
		});
		
		getUserCountByCareerDate(result);
	});
	
	//연차별 인원 수
	function getUserCountByCareerDate(result){
		console.log(result);
		var table = $(".user_register_list_pannel table");
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
	
	// keyword 추가 버튼
	$(document).on("click", ".keywordAddBtn", function(){
		var $keywordInputPannel = $(".keyword_InputPannel");
		if($keywordInputPannel.css("display", "none")){
			$keywordInputPannel.css("display", "inline-block");
			$(".keyword_InputPannel").children("input").focus();
		}
	});
	
	
	// 키워드 추가 버튼에서 엔터시 blur
	$(document).on("keydown", $(".keyword_InputPannel").children("input"), function(key){
		if (key.keyCode == 13) {
			$(this).blur();
		}
	});
	
	// 키워드 추가 input에 blur 이벤트 발생 시 
	// 입력한 내용을 검색 키워드로 추가
	$(document).on("blur", $(".keyword_InputPannel").children("input"), function(){
		var $keywordInputPannel = $(".keyword_InputPannel");
		var $inputSelf = $(".keyword_InputPannel").children("input");
		var val = $(".keyword_InputPannel").children("input").val();
		
		$keywordInputPannel.css("display", "none");
		
		if(!isEmpty(val)){
			var beforeText = "";
			
			beforeText += '<div class="keyword-body">#';
			beforeText += '<span class="keyword-text">';
			beforeText += val;
			beforeText += '</span><button class="keyword-remove-btn keywordRemoveBtn"><span>X</span></button></div>';
			
			$keywordInputPannel.before(beforeText);
			$inputSelf.val("");
		}
		
	});
	
	// 키워드 삭제 버튼
	$(document).on('click','.keywordRemoveBtn',function(){
		var $keywordObj = $(this).parent(".keyword-body");
		$keywordObj.remove();
	});
	
	// 성별 선택시 hidden 함수에 값 입력
	$(document).on("change","#genderSelect", function(){
		var value = $(this).val();
		if(value==""){
			$("#userGender").attr("name","");
		}else{
			$("#userGender").attr("name","userGender")
		}
		$("input[name='userGender']").val(value);
	});
	
	// 불러오기 내 검색어 입력창에서 엔터시 검색
	$(document).on("keydown","#userListSearchWord",function(key) {
		console.log("test");
		if (key.keyCode == 13) {
			$("#userListSearchBtn").click();
			$(this).blur();
		}
	});
	
	//엑셀다운
	$(document).on("click", "#downloadExel", function() {
		
		$.ajax({
			url: "./personalHistory/downexcel.do",
			type: "POST",
			dataType: "json",
			success:function(data){
				if(data.success == 'Y'){
					alert("다운로드 완료.");
				}else{
					alert("다운로드가 제대로 이루어지지 않았습니다.");
				}
			}
		});
	});
	
	
	
	
	