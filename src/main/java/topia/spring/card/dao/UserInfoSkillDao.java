package topia.spring.card.dao;

import java.util.*;

import org.mybatis.spring.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import topia.spring.card.vo.*;

@Repository
public class UserInfoSkillDao {

	@Autowired
	private SqlSessionTemplate tpl;
	
	public Integer insert(Map<String, Object> paramMap) {
		return tpl.insert("skillDao.insert", paramMap);
	}
	
	public Integer updateUserSkill(UserInfoSkill userInfoSkill) {
		return tpl.update("skillDao.updateUserSkill", userInfoSkill);
	}

	public List<UserInfoSkill> list(int intUserIdx) {
		return tpl.selectList("skillDao.list", intUserIdx);
	}
}
