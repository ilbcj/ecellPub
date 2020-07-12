package com.ilbcj.ecell.service.impl;

import java.util.HashMap;
//import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
//import com.ilbcj.ecell.dto.PubPlayerProfileDTO;
import com.ilbcj.ecell.service.MatchService;

@Service("matchService")
public class MatchServiceImpl implements MatchService {
	
	@Autowired
	private RestTemplate restTemplate;

	@SuppressWarnings("unused")
	@Override
	public String queryPlayerProfileById(Map<String, Object> parm) {
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("players", parm.get("players"));
		String playerProfileJsonStr = restTemplate.postForObject("http://127.0.0.1:8080/cell/public/profile", params, String.class);
		JSONObject deviceRegisterObj = JSONObject.parseObject(playerProfileJsonStr);
//			String desc = (String)deviceRegisterObj.get("desc");
		return playerProfileJsonStr;
	}

	@Override
	public String queryPlayerList(Map<String, Object> parm) {
		Map<String,Object> params = new HashMap<String,Object>();
		String playerListJsonStr = restTemplate.postForObject("http://127.0.0.1:8080/cell/player/basic/list", params, String.class);
		return playerListJsonStr;
	}

	@Override
	public String querySeasonList(Map<String, Object> parm) {
		Map<String,Object> params = new HashMap<String,Object>();
		String seasonListJsonStr = restTemplate.postForObject("http://127.0.0.1:8080/cell/season/basic/list", params, String.class);
		return seasonListJsonStr;
	}
}
