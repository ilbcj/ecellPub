package com.ilbcj.ecell.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.ilbcj.ecell.service.MatchService;

@Service("matchService")
public class MatchServiceImpl implements MatchService {
	
	@Autowired
	private RestTemplate restTemplate;

	@Override
	public Object queryMatchDayInfo() {
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("location", "demolocal");
		String deviceRegister = restTemplate.postForObject("http://UNIFIED-SERVICE/UnifiedServer/device/deviceRegister", params, String.class);
		JSONObject deviceRegisterObj = JSONObject.parseObject(deviceRegister);
//			String desc = (String)deviceRegisterObj.get("desc");
		return deviceRegisterObj;
	}
}
