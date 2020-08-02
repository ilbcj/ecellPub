package com.ilbcj.ecell.service;

import java.util.Map;

public interface MatchService {

	//public List<PubPlayerProfileDTO> queryPlayerProfileById(Map<String, Object> parm);
	public String queryPlayerProfileById(Map<String, Object> parm);

	public String queryPlayerList(Map<String, Object> parm);

	public String querySeasonList(Map<String, Object> parm);

	public String queryTop10(Map<String, Object> parm);

	public String queryScheduleMatches(Map<String, Object> parm);

}
