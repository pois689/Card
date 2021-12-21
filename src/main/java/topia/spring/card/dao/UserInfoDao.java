package topia.spring.card.dao;


import org.mybatis.spring.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import topia.spring.card.vo.*;

@Repository
public class UserInfoDao {
	
	@Autowired
	private SqlSessionTemplate tpl;
	
	public Integer insert(UserInfo info) {
		return tpl.insert("userInfoDao.insert", info);
	}
	
	public UserInfo userInfo(Integer userIdx) {
		return tpl.selectOne("userInfoDao.userInfo", userIdx);
	}
	
	/*
	 * public List<UserInfo> userInfoList(PageVo pageVo) { return
	 * tpl.selectList("userInfoDao.userInfoList",pageVo); }
	 */
	
	public int UserCount() {
		return tpl.selectOne("userInfoDao.UserCount");
	}
	
	  public int userInfoUpdate(UserInfo userInfo) {
		  return tpl.update("userInfoDao.userInfoUpdate",userInfo);
	  }
}
