<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<script src="../resources/compnent/jquery-3.3.1.min.js"></script>
<script src="../resources/compnent/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
<script src="./resources/js/util/util.js"></script>
	
<script src="../resources/js/indexList/userList.js"></script>
<link rel="stylesheet" type="text/css" href="../resources/css/indexList/indexList.css">
	
</head>
<body>

	<div class="user_list_pannel">
			
			<input type="hidden" id="userInfoTotalCnt" autocomplete="off" value="5">
			<input type="hidden" id="userInfoPageSize" value="10" autocomplete="off">
			<input type="hidden" id="userInfoPageNo" value="1" autocomplete="off">
			
		<h2 style="text-align: center;">회원 리스트</h2>
		
		<div class="user_list_search_pannel">
			<select id="userListSearchPeriod">
				<option value="">검색조건</option>
				<option value="userName">이름</option>
				<option value="userComp">소속회사</option>
				<option value="userDept">부서</option>
			</select>
			
			<input type="text" id="userListSearchWord" autocomplete="off">
			
			<select id="userCareerLength">
				<option value="">경력사항</option>
				<option value="1">1년이상</option>
				<option value="2">2년이상</option>
				<option value="3">3년이상</option>
				<option value="4">4년이상</option>
				<option value="5">5년이상</option>
				<option value="6">6년이상</option>
				<option value="7">7년이상</option>
				<option value="8">8년이상</option>
				<option value="9">9년이상</option>
				<option value="10">10년이상</option>
			</select>
			
			<select id="userInfoDataSize">
				<option value="10">10개씩</option>
				<option value="20">20개씩</option>
			</select>
			<select id="genderSelect">
				<option value="" selected="selected">성별</option>
				<option value="남성">남성</option>
				<option value="여성">여성</option>
			</select>
			<select id="maritalSelect">
				<option value="" selected="selected">결혼여부</option>
				<option value="기혼">기혼</option>
				<option value="미혼">미혼</option>
			</select>
			<select id="addressSelect">
				<option value="" selected="selected">주소</option>
				<option value="서울">서울</option>
				<option value="경기도">경기도</option>
				<option value="강원도">강원도</option>
				<option value="충청남도">충청남도</option>
				<option value="충청북도">충청북도</option>
				<option value="전라남도">전라남도</option>
				<option value="전라북도">전라북도</option>
				<option value="경상남도">경상남도</option>
				<option value="경상북도">경상북도</option>
				<option value="제주도">제주도</option>
			</select>
			
			<input type="hidden" id="userGender" name="userGender" autocomplete="off">
			<button id="userListSearchBtn" class="user_list_search_btn">검색</button>
			<div class="search_cnt_pannel">
				<span class="search_cnt_prev">검색결과 : </span>
				<span class="search_cnt_cnt"></span>
				<span class="search_cnt_later"> 건</span>
			</div>
		</div>
		
		<div class="down_search_btn">
			<button id="getUserCountByCareerDate">연차별 인원보기</button>
			<button id="downloadExel">엑셀 다운로드</button>
		</div>
	
		
		<div class="keyword_add">
			<div class="keyword_InputPannel">#
				<input maxlength="16" autocomplete="off">
			</div>
			
			<div class="keyword_add_tooltip">
				<div class="keywordAddBtn">
				+
				</div>
				<span class="tooltiptext">진행 했던 프로젝트의 개발환경을 키워드로 추가하여 조회</span>
			</div>
		</div>
		
	
		<div class="user_register_list_pannel">
		
			<table class="user_register_list_table">
				<thead>
					<tr>
						<td>등록번호</td>
						<td>성명</td>
						<td>소속회사</td>
						<td>부서</td>
						<td>성별</td>
						<td>경력</td>
						<td>등록날짜</td>
					</tr>
				</thead>
				<tbody>
					<tr>
					</tr>
				</tbody>
			</table>
			
			<div class="user_paging_pannel">
				<!-- <a href="#">◀</a>
					<strong>1</strong>
				<a href="#">▶</a> -->
			</div>
		</div>
	</div>
</body>
</html>