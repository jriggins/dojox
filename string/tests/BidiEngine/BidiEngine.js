dojo.provide("dojox.string.tests.BidiEngine.BidiEngine");
dojo.require("dojox.string.BidiEngine");
dojo.addOnLoad(function(){
			
	var unilisrc = [
		// 0
		"abc def ghij",
		// 1
		"abc\u0020\u05d4\u05d5\u05d6\u05d7\u0020\u05d8\u05d9\u05da\u0020\u05da\u05db\u05dc\u05dd\u0020opq rstu",
		// 2
		"abc !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ def",
		// 3
		"abc !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ \u05d4\u05d5\u05d6",
		// 4
		".-= abc def /\\",
		// 5
		".-= abc \u05d4\u05d5\u05d6 /\\",
		// 6
		"abc 123",
		// 7
		"abc 123 401",
		// 8
		"abc 123 ghi",
		// 9
		"abc 123 401 ghi",
		// 10
		"abc 123 \u05d7\u05d8\u05d9",
		// 11
		"abc 123 401 \u05d7\u05d8\u05d9",
		// 12
		"abc0123",
		// 13
		"abc0123 401",
		// 14
		"abc0123ghi",
		// 15
		"abc0123 401ghi",
		// 16
		"abc0123\u05d7\u05d8\u05d9",
		// 17
		"abc0123 401\u05d7\u05d8\u05d9",
		// 18
		"abc \u05d4\u05d5\u05d6 123",
		// 19
		"abc \u05d4\u05d5\u05d6 123 401",
		// 20
		"abc \u05d4\u05d5\u05d6 123 ghi",
		// 21
		"abc \u05d4\u05d5\u05d6 123 401 ghi",
		// 22
		"abc \u05d4\u05d5\u05d6 123 \u05d7\u05d8\u05d9",
		// 23
		"abc \u05d4\u05d5\u05d6 123 401 \u05d7\u05d8\u05d9",
		// 24
		"abc \u05d4\u05d5\u05d60123",
		// 25
		"abc \u05d4\u05d5\u05d60123 401",
		// 26
		"abc \u05d4\u05d5\u05d601234ghi",
		// 27
		"abc \u05d4\u05d5\u05d60123 401ghi",
		// 28
		"abc \u05d4\u05d5\u05d601234\u05d7\u05d8\u05d9",
		// 29
		"abc \u05d4\u05d5\u05d60123 401\u05d7\u05d8\u05d9",
		// 30
		"123 401 abc def",
		// 31
		"abc(\u05d4\u05d5\u05d6)\u05d7\u05d8\u05d9",
		// 32
		"abc(\u05d4\u05d5\u05d6)ghi",
		// 33
		"abc(def)\u05d7\u05d8\u05d9",
		// 34
		"abc(def)ghi",
		// 35
		"abc\u05bbde\u05b8fg",
		// 36
		"abc\u05bb\u05d4\u05d5\u05b8fg",
		// 37
		"abc \u05d4\u05d5\u05d6\u05d7	\u05d8\u05d9\u05da klm",
		// 38
		"abc \u05d4\u05d5\u05d6\u05d7	hij klm",
		// 39
		"abc defg	\u05d8\u05d9\u05da klm",
		// 40
		"abc defg	hij klm",
		// 41
		"abc \u05d4\u05d5\u05d6\u05d7    	  \u05d8\u05d9\u05da klm",
		// 42
		"abc \u05d4\u05d5\u05d6\u05d7    	  hij klm",
		// 43
		"abc defg    	  \u05d8\u05d9\u05da klm",
		// 44
		"abc defg    	  hij klm",
		// 45
		"abc \u05d4\u05d5\u05d6\u05d7 ._-	=\u005c\u05d8\u05d9\u05da klm",
		// 46
		"abc \u05d4\u05d5\u05d6\u05d7 ._-	=\hij klm",
		// 47
		"abc defg ._-	=\u005c\u05d8\u05d9\u05da klm",
		// 48
		"abc defg ._-	=\hij klm",
		// 49
		"abc \u05d4\u05d5\u05d6\u05d7 ._-    	  =\u005c\u05d8\u05d9\u05da klm",
		// 50
		"abc \u05d4\u05d5\u05d6\u05d7 ._-    	  =\hij klm",
		// 51
		"abc defg ._-    	  =\u005c\u05d8\u05d9\u05da klm",
		// 52
		"abc defg ._-    	  =\hij klm",
		// 53
		"   abc \u05d4\u05d5\u05d6 ghi",
		// 54
		".- abc \u05d4\u05d5\u05d6 ghi",
		// 55
		"12 abc \u05d4\u05d5\u05d6 ghi",
		// 56
		"/* 012$ % 3401$ < = 12 */"
		];

	var uniliout = [
		"abc def ghij",
		//"abc ×?×?××? ×?×× ×××× opq rstu",
		"abc \u05dd\u05dc\u05db\u05da\u0020\u05da\u05d9\u05d8\u0020\u05d7\u05d6\u05d5\u05d4 opq rstu",
		"abc !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ def",
		//"abc !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ×××",
		"abc !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ \u05d6\u05d5\u05d4",
		".-= abc def /\\",
		//".-= abc ××× /\\",
		".-= abc \u05d6\u05d5\u05d4 /\\",
		"abc 123",
		"abc 123 401",
		"abc 123 ghi",
		"abc 123 401 ghi",
		//"abc 123 ×××",
		"abc 123 \u05d9\u05d8\u05d7",
		//"abc 123 401 ×××",
		"abc 123 401 \u05d9\u05d8\u05d7",
		"abc0123",
		"abc0123 401",
		"abc0123ghi",
		"abc0123 401ghi",
		//"abc0123×××",
		"abc0123\u05d9\u05d8\u05d7",
		//"abc0123 401×××",
		"abc0123 401\u05d9\u05d8\u05d7",
		//"abc 123 ×××",
		"abc 123 \u05d6\u05d5\u05d4",
		//"abc 401 123 ×××",
		"abc 401 123 \u05d6\u05d5\u05d4",
		//"abc 123 ××× ghi",
		"abc 123 \u05d6\u05d5\u05d4 ghi",
		//"abc 401 123 ××× ghi",
		"abc 401 123 \u05d6\u05d5\u05d4 ghi",
		//"abc ××× 123 ×××",
		"abc \u05d9\u05d8\u05d7 123 \u05d6\u05d5\u05d4",
		//"abc ××× 401 123 ×××",
		"abc \u05d9\u05d8\u05d7 401 123 \u05d6\u05d5\u05d4",
		//"abc 0123×××",
		"abc 0123\u05d6\u05d5\u05d4",
		//"abc 401 0123×××",
		"abc 401 0123\u05d6\u05d5\u05d4",
		//"abc 01234×××ghi",
		"abc 01234\u05d6\u05d5\u05d4ghi",
		//"abc 401 0123×××ghi",
		"abc 401 0123\u05d6\u05d5\u05d4ghi",
		//"abc ×××01234×××",
		"abc \u05d9\u05d8\u05d701234\u05d6\u05d5\u05d4",
		//"abc ×××401 0123×××",
		"abc \u05d9\u05d8\u05d7401 0123\u05d6\u05d5\u05d4",
		"123 401 abc def",
		//"abc(×××(×××",
		"abc(\u05d9\u05d8\u05d7(\u05d6\u05d5\u05d4",
		//"abc(×××)ghi",
		"abc(\u05d6\u05d5\u05d4)ghi",
		//"abc(def)×××",
		"abc(def)\u05d9\u05d8\u05d7",
		"abc(def)ghi",
		//"abcÖ»deÖ¸fg",
		"abc\u05bbde\u05b8fg",
		//"abcÖ»Ö¸××fg",
		"abc\u05bb\u05b8\u05d5\u05d4fg",
		//"abc ××××	×?×× klm",
		"abc \u05d7\u05d6\u05d5\u05d4	\u05da\u05d9\u05d8 klm",
		//"abc ××××	hij klm",
		"abc \u05d7\u05d6\u05d5\u05d4	hij klm",
		//"abc defg	×?×× klm",
		"abc defg	\u05da\u05d9\u05d8 klm",
		"abc defg	hij klm",
		//"abc ××××    	×?××   klm",
		"abc \u05d7\u05d6\u05d5\u05d4    	\u05da\u05d9\u05d8   klm",
		//"abc ××××    	  hij klm",
		"abc \u05d7\u05d6\u05d5\u05d4    	  hij klm",
		//"abc defg    	  ×?×× klm",
		"abc defg    	  \u05da\u05d9\u05d8 klm",
		"abc defg    	  hij klm",
		//"abc -_. ××××	×?××\= klm",
		"abc -_. \u05d7\u05d6\u05d5\u05d4	\u05da\u05d9\u05d8\u005c= klm",
		//"abc ×××× ._-	=\hij klm",
		"abc \u05d7\u05d6\u05d5\u05d4 ._-	=\hij klm",
		//"abc defg ._-	=\×?×× klm",
		"abc defg ._-	=\u005c\u05da\u05d9\u05d8 klm",
		"abc defg ._-	=\hij klm",
		//"abc -_. ××××    	×?××\=   klm",
		"abc -_. \u05d7\u05d6\u05d5\u05d4    	\u05da\u05d9\u05d8\u005c=   klm",
		//"abc ×××× ._-    	  =\hij klm",
		"abc \u05d7\u05d6\u05d5\u05d4 ._-    	  =\hij klm",
		//"abc defg ._-    	  =\×?×× klm",
		"abc defg ._-    	  =\u005c\u05da\u05d9\u05d8 klm",
		"abc defg ._-    	  =\hij klm",
		//"   abc ××× ghi",
		"   abc \u05d6\u05d5\u05d4 ghi",
		//".- abc ××× ghi",
		".- abc \u05d6\u05d5\u05d4 ghi",
		//"12 abc ××× ghi",
		"12 abc \u05d6\u05d5\u05d4 ghi",
		"/* 012$ % 3401$ < = 12 */"
		];
	var unirisrc = [
		//"××× ××× ××××?",
		"\u05d1\u05d2\u05d3\u0020\u05d4\u05d5\u05d6\u0020\u05d7\u05d8\u05d9\u05da",
		//"××× defg hij klmn ××× ××?××?",
		"\u05d1\u05d2\u05d3 defg hij klmn \u05d6\u05d7\u05d8\u0020\u05d9\u05da\u05db\u05dc",
		//"××× #123 $234 %340 +401 -012 ×××",
		"\u05d1\u05d2\u05d3 #123 $234 %340 +401 -012 \u05d4\u05d5\u05d6",
		//"××× 123# 234$ 340% 401+ 012- ×××",
		"\u05d1\u05d2\u05d3 123# 234$ 340% 401+ 012- \u05d4\u05d5\u05d6",
		//"××× 123#234$340%401+012-024 ×××",
		"\u05d1\u05d2\u05d3 123#234$340%401+012-024 \u05d4\u05d5\u05d6",
		//"××× 123-",
		"\u05d1\u05d2\u05d3 123-",
		//"×× 20 + 14 = 34?",
		"\u05d9\u05d6 20 + 14 = 34?",
		//"××× 123.",
		"\u05d1\u05d2\u05d3 123.",
		//"××× 12,340,123.40:13:24/30/41 ×××",
		"\u05d1\u05d2\u05d3 12,340,123.40:13:24/30/41 \u05d4\u05d5\u05d6",
		//"××× -12,340.13$ ×××",
		"\u05d1\u05d2\u05d3 -12,340.13$ \u05d4\u05d5\u05d6",
		//"× ××?×××?: 4.4-0.4=4.0, ok?",
		"\u05d9\u0020\u05d3\u05dc\u05d1\u05d9\u05dd: 4.4-0.4=4.0, ok?",
		//"××× ,123 .234 :340 /401 ×××",
		"\u05d1\u05d2\u05d3 ,123 .234 :340 /401 \u05d4\u05d5\u05d6",
		//"××× 123, 234. 340: 401/ ×××",
		"\u05d1\u05d2\u05d3 123, 234. 340: 401/ \u05d4\u05d5\u05d6",
		//"××× 123..40 ×××",
		"\u05d1\u05d2\u05d3 123..40 \u05d4\u05d5\u05d6",
		//"××× 123.,40 ×××",
		"\u05d1\u05d2\u05d3 123.,40 \u05d4\u05d5\u05d6",
		//"××× 123/.40 ×××",
		"\u05d1\u05d2\u05d3 123/.40 \u05d4\u05d5\u05d6",
		//"××× ---123$$ ×××",
		"\u05d1\u05d2\u05d3 ---123$$ \u05d4\u05d5\u05d6",
		//"××× +-123#$% ×××",
		"\u05d1\u05d2\u05d3 +-123#$% \u05d4\u05d5\u05d6",
		//"××× 123###234$%340%%%401+--012-++130 ×××",
		"\u05d1\u05d2\u05d3 123###234$%340%%%401+--012-++130 \u05d4\u05d5\u05d6",
		//"××× !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ×××",
		"\u05d1\u05d2\u05d3 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \u05d4\u05d5\u05d6",
		//"××× !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ def",
		"\u05d1\u05d2\u05d3 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ def",
		//".-= ××× ××× /\\",
		".-= \u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6 /\\",
		//".-= ××× def /\\",
		".-= \u05d1\u05d2\u05d3 def /\\",
		//"××× 123",
		"\u05d1\u05d2\u05d3 123",
		//"××× 123 401",
		"\u05d1\u05d2\u05d3 123 401",
		//"××× 123 ×××",
		"\u05d1\u05d2\u05d3 123 \u05d7\u05d8\u05d9",
		//"××× 123 401 ×××",
		"\u05d1\u05d2\u05d3 123 401 \u05d7\u05d8\u05d9",
		//"××× 123 ghi",
		"\u05d1\u05d2\u05d3 123 ghi",
		//"××× 123 401 ghi",
		"\u05d1\u05d2\u05d3 123 401 ghi",
		//"×××0123",
		"\u05d1\u05d2\u05d30123",
		//"×××0123 401",
		"\u05d1\u05d2\u05d30123 401",
		//"×××01234×××",
		"\u05d1\u05d2\u05d301234\u05d7\u05d8\u05d9",
		//"×××0123 401×××",
		"\u05d1\u05d2\u05d30123 401\u05d7\u05d8\u05d9",
		//"×××01234ghi",
		"\u05d1\u05d2\u05d301234ghi",
		//"×××0123 401ghi",
		"\u05d1\u05d2\u05d30123 401ghi",
		//"××× def 123",
		"\u05d1\u05d2\u05d3 def 123",
		//"××× def 123 401",
		"\u05d1\u05d2\u05d3 def 123 401",
		//"××× def 123 ×××",
		"\u05d1\u05d2\u05d3 def 123 \u05d7\u05d8\u05d9",
		//"××× def 123 401 ×××",
		"\u05d1\u05d2\u05d3 def 123 401 \u05d7\u05d8\u05d9",
		//"××× def 123 ghi",
		"\u05d1\u05d2\u05d3 def 123 ghi",
		//"××× def 123 401 ghi",
		"\u05d1\u05d2\u05d3 def 123 401 ghi",
		//"××× def123",
		"\u05d1\u05d2\u05d3 def123",
		//"××× def0123 401",
		"\u05d1\u05d2\u05d3 def0123 401",
		//"××× def01234×××",
		"\u05d1\u05d2\u05d3 def01234\u05d7\u05d8\u05d9",
		//"××× def0123 401×××",
		"\u05d1\u05d2\u05d3 def0123 401\u05d7\u05d8\u05d9",
		//"××× def01234ghi",
		"\u05d1\u05d2\u05d3 def01234ghi",
		//"××× def0123 401ghi",
		"\u05d1\u05d2\u05d3 def0123 401ghi",
		//"123 401 ××× ×××",
		"123 401 \u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6",
		//"×××(×××)×××",
		"\u05d1\u05d2\u05d3(\u05d4\u05d5\u05d6)\u05d7\u05d8\u05d9",
		//"×××(×××)ghi",
		"\u05d1\u05d2\u05d3(\u05d4\u05d5\u05d6)ghi",
		//"×××(def)×××",
		"\u05d1\u05d2\u05d3(def)\u05d7\u05d8\u05d9",
		//"×××(def)ghi",
		"\u05d1\u05d2\u05d3(def)ghi",
		//"××× (×××) [×××] {×?××?} <×?×> ×××",
		"\u05d1\u05d2\u05d3 (\u05d4\u05d5\u05d6) [\u05d7\u05d8\u05d9] {\u05da\u05db\u05dc} <\u05dd\u05d1> \u05d2\u05d3\u05d4",
		//"×××Ö»××Ö¸××",
		"\u05d1\u05d2\u05d3\u05bb\u05d4\u05d5\u05b8\u05d6\u05d7",
		//"×××Ö»d×Ö¸××",
		"\u05d1\u05d2\u05d3\u05bb\u0064\u05d5\u05b8\u05d6\u05d7",
		//"Ö»××",
		"\u05bb\u05d4\u05d5",
		//"××× defg	hij ××?×?",
		"\u05d1\u05d2\u05d3 defg	hij \u05db\u05dc\u05dd",
		//"××× defg	×××? ××?×?",
		"\u05d1\u05d2\u05d3 defg	\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× ××××	hij ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7	hij \u05db\u05dc\u05dd",
		//"××× ××××	×××? ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7	\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× defg    	  hij ××?×?",
		"\u05d1\u05d2\u05d3 defg    	  hij \u05db\u05dc\u05dd",
		//"××× defg    	  ×××? ××?×?",
		"\u05d1\u05d2\u05d3 defg    	  \u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× ××××    	  hij ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7    	  hij \u05db\u05dc\u05dd",
		//"××× ××××    	  ×××? ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7    	  \u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× defg ._-	=\hij ××?×?",
		"\u05d1\u05d2\u05d3 defg ._-	=\hij \u05db\u05dc\u05dd",
		//"××× defg ._-	=\×××? ××?×?",
		"\u05d1\u05d2\u05d3 defg ._-	=\u005c\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× ×××× ._-	=\hij ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7 ._-	=\hij \u05db\u05dc\u05dd",
		//"××× ×××× ._-	=\×××? ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7 ._-	=\u005c\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× defg ._-    	  =\hij ××?×?",
		"\u05d1\u05d2\u05d3 defg ._-    	  =\hij \u05db\u05dc\u05dd",
		//"××× defg ._-    	  =\×××? ××?×?",
		"\u05d1\u05d2\u05d3 defg ._-    	  =\u005c\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"××× ×××× ._-    	  =\hij ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7 ._-    	  =\hij \u05db\u05dc\u05dd",
		//"××× ×××× ._-    	  =\×××? ××?×?",
		"\u05d1\u05d2\u05d3 \u05d4\u05d5\u05d6\u05d7 ._-    	  =\u005c\u05d8\u05d9\u05da \u05db\u05dc\u05dd",
		//"   ××× def ×××",
		"   \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9",
		//".- ××× def ×××",
		".- \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9",
		//"12 ××× def ×××",
		"12 \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9",
		//"1. ××× def ×××",
		"1. \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9",
		//"1) ××× def ×××",
		"1) \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9",
		//".3 ××× def ×××"
		".3 \u05d1\u05d2\u05d3 def \u05d7\u05d8\u05d9"
	];
	var uniriout = [
		//"×?××× ××× ×××",
		"\u05da\u05d9\u05d8\u05d7\u0020\u05d6\u05d5\u05d4\u0020\u05d3\u05d2\u05d1",
		//"×?××?× ××× defg hij klmn ×××",
		"\u05dc\u05db\u05da\u05d9 \u05d8\u05d7\u05d6 defg hij klmn \u05d3\u05d2\u05d1",
		//"××× 012- 401+ %340 $234 #123 ×××",
		"\u05d6\u05d5\u05d4 012- 401+ %340 $234 #123 \u05d3\u05d2\u05d1",
		//"××× -012 +401 340% 234$ 123# ×××",
		"\u05d6\u05d5\u05d4 -012 +401 340% 234$ 123# \u05d3\u05d2\u05d1",
		//"××× 123#234$340%401+012-024 ×××",
		"\u05d6\u05d5\u05d4 123#234$340%401+012-024 \u05d3\u05d2\u05d1",
		//"-123 ×××",
		"-123 \u05d3\u05d2\u05d1",
		//"?34 = 14 + 20 ××",
		"?34 = 14 + 20 \u05d6\u05d9",
		//".123 ×××",
		".123 \u05d3\u05d2\u05d1",
		//"××× 12,340,123.40:13:24/30/41 ×××",
		"\u05d6\u05d5\u05d4 12,340,123.40:13:24/30/41 \u05d3\u05d2\u05d1",
		//"××× 12,340.13$- ×××",
		"\u05d6\u05d5\u05d4 12,340.13$- \u05d3\u05d2\u05d1",
		//"?ok ,4.0=4.4-0.4 :×?×××?× ×",
		"?ok ,4.0=4.4-0.4 :\u05dd\u05d9\u05d1\u05dc\u05d3\u0020\u05d9",
		//"××× 401/ 340: 234. 123, ×××",
		"\u05d6\u05d5\u05d4 401/ 340: 234. 123, \u05d3\u05d2\u05d1",
		//"××× /401 :340 .234 ,123 ×××",
		"\u05d6\u05d5\u05d4 /401 :340 .234 ,123 \u05d3\u05d2\u05d1",
		//"××× 40..123 ×××",
		"\u05d6\u05d5\u05d4 40..123 \u05d3\u05d2\u05d1",
		//"××× 40,.123 ×××",
		"\u05d6\u05d5\u05d4 40,.123 \u05d3\u05d2\u05d1",
		//"××× 40./123 ×××",
		"\u05d6\u05d5\u05d4 40./123 \u05d3\u05d2\u05d1",
		//"××× 123$$--- ×××",
		"\u05d6\u05d5\u05d4 123$$--- \u05d3\u05d2\u05d1",
		//"××× 123#$%-+ ×××",
		"\u05d6\u05d5\u05d4 123#$%-+ \u05d3\u05d2\u05d1",
		//"××× 130++-012--+123###234$%340%%%401 ×××",
		"\u05d6\u05d5\u05d4 130++-012--+123###234$%340%%%401 \u05d3\u05d2\u05d1",
		//"××× ~{|}`_^[\\]@?<=>;:/.-,+*()'&%$#\"! ×××",
		"\u05d6\u05d5\u05d4 ~{|}`_^[\\]@?<=>;:/.-,+*()'&%$#\"! \u05d3\u05d2\u05d1",
		//"def ~{|}`_^[\\]@?<=>;:/.-,+*()'&%$#\"! ×××",
		"def ~{|}`_^[\\]@?<=>;:/.-,+*()'&%$#\"! \u05d3\u05d2\u05d1",
		//"\\/ ××× ××× =-.",
		"\\/ \u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1 =-.",
		//"\\/ def ××× =-.",
		"\\/ def \u05d3\u05d2\u05d1 =-.",
		//"123 ×××",
		"123 \u05d3\u05d2\u05d1",
		//"401 123 ×××",
		"401 123 \u05d3\u05d2\u05d1",
		//"××× 123 ×××",
		"\u05d9\u05d8\u05d7 123 \u05d3\u05d2\u05d1",
		//"××× 401 123 ×××",
		"\u05d9\u05d8\u05d7 401 123 \u05d3\u05d2\u05d1",
		//"ghi 123 ×××",
		"ghi 123 \u05d3\u05d2\u05d1",
		//"ghi 401 123 ×××",
		"ghi 401 123 \u05d3\u05d2\u05d1",
		//"0123×××",
		"0123\u05d3\u05d2\u05d1",
		//"401 0123×××",
		"401 0123\u05d3\u05d2\u05d1",
		//"×××01234×××",
		"\u05d9\u05d8\u05d701234\u05d3\u05d2\u05d1",
		//"×××401 0123×××",
		"\u05d9\u05d8\u05d7401 0123\u05d3\u05d2\u05d1",
		//"01234ghi×××",
		"01234ghi\u05d3\u05d2\u05d1",
		//"401ghi 0123×××",
		"401ghi 0123\u05d3\u05d2\u05d1",
		//"def 123 ×××",
		"def 123 \u05d3\u05d2\u05d1",
		//"def 123 401 ×××",
		"def 123 401 \u05d3\u05d2\u05d1",
		//"××× def 123 ×××",
		"\u05d9\u05d8\u05d7 def 123 \u05d3\u05d2\u05d1",
		//"××× def 123 401 ×××",
		"\u05d9\u05d8\u05d7 def 123 401 \u05d3\u05d2\u05d1",
		//"def 123 ghi ×××",
		"def 123 ghi \u05d3\u05d2\u05d1",
		//"def 123 401 ghi ×××",
		"def 123 401 ghi \u05d3\u05d2\u05d1",
		//"def123 ×××",
		"def123 \u05d3\u05d2\u05d1",
		//"def0123 401 ×××",
		"def0123 401 \u05d3\u05d2\u05d1",
		//"×××def01234 ×××",
		"\u05d9\u05d8\u05d7def01234 \u05d3\u05d2\u05d1",
		//"×××def0123 401 ×××",
		"\u05d9\u05d8\u05d7def0123 401 \u05d3\u05d2\u05d1",
		//"def01234ghi ×××",
		"def01234ghi \u05d3\u05d2\u05d1",
		//"def0123 401ghi ×××",
		"def0123 401ghi \u05d3\u05d2\u05d1",
		//"××× ××× 401 123",
		"\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1 401 123",
		//"×××(×××)×××",
		"\u05d9\u05d8\u05d7(\u05d6\u05d5\u05d4)\u05d3\u05d2\u05d1",
		//"ghi(×××)×××",
		"ghi(\u05d6\u05d5\u05d4)\u05d3\u05d2\u05d1",
		//"×××(def)×××",
		"\u05d9\u05d8\u05d7(def)\u05d3\u05d2\u05d1",
		//"def)ghi)×××",
		"def)ghi)\u05d3\u05d2\u05d1",
		//"××× <××?> {×?××?} [×××] (×××) ×××",
		"\u05d4\u05d3\u05d2 <\u05d1\u05dd> {\u05dc\u05db\u05da} [\u05d9\u05d8\u05d7] (\u05d6\u05d5\u05d4) \u05d3\u05d2\u05d1",
		//"××Ö¸××Ö»×××",
		"\u05d7\u05d6\u05b8\u05d5\u05d4\u05bb\u05d3\u05d2\u05d1",
		//"××Ö¸×dÖ»×××",
		"\u05d7\u05d6\u05b8\u05d5\u0064\u05bb\u05d3\u05d2\u05d1",
		//"××Ö»",
		"\u05d5\u05d4\u05bb",
		//"×?×?× hij	defg ×××",
		"\u05dd\u05dc\u05db hij	defg \u05d3\u05d2\u05d1",
		//"×?×?× ×?××	defg ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8	defg \u05d3\u05d2\u05d1",
		//"×?×?× hij	×××× ×××",
		"\u05dd\u05dc\u05db hij	\u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?× ×?××	×××× ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8	\u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?×   hij	    defg ×××",
		"\u05dd\u05dc\u05db   hij	    defg \u05d3\u05d2\u05d1",
		//"×?×?× ×?××  	    defg ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8  	    defg \u05d3\u05d2\u05d1",
		//"×?×?× hij  	    ×××× ×××",
		"\u05dd\u05dc\u05db hij  	    \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?× ×?××  	    ×××× ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8  	    \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?× =\hij	defg ._- ×××",
		"\u05dd\u05dc\u05db =\hij	defg ._- \u05d3\u05d2\u05d1",
		//"×?×?× ×?××\=	-_. defg ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8\u005c=	-_. defg \u05d3\u05d2\u05d1",
		//"×?×?× hij\=	-_. ×××× ×××",
		"\u05dd\u05dc\u05db hij\=	-_. \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?× ×?××\=	-_. ×××× ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8\u005c=	-_. \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?×   =\hij	    defg ._- ×××",
		"\u05dd\u05dc\u05db   =\hij	    defg ._- \u05d3\u05d2\u05d1",
		//"×?×?× ×?××\=  	    -_. defg ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8\u005c=  	    -_. defg \u05d3\u05d2\u05d1",
		//"×?×?× hij\=  	    -_. ×××× ×××",
		"\u05dd\u05dc\u05db hij\=  	    -_. \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"×?×?× ×?××\=  	    -_. ×××× ×××",
		"\u05dd\u05dc\u05db \u05da\u05d9\u05d8\u005c=  	    -_. \u05d7\u05d6\u05d5\u05d4 \u05d3\u05d2\u05d1",
		//"××× def ×××   ",
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1   ",
		//"××× def ××× -.",
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1 -.",
		//"××× def ××× 12",
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1 12",
		//"××× def ××× .1",
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1 .1",
		//"××× def ××× (1",
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1 (1",
		//"××× def ××× 3."
		"\u05d9\u05d8\u05d7 def \u05d3\u05d2\u05d1 3."
	];
			
	var unilicrs = [
		"jihg fed cba",
		//"utsr qpo ×?×?××? ×?×× ×××× cba",
		"utsr qpo \u05dd\u05dc\u05db\u05da\u0020\u05da\u05d9\u05d8\u0020\u05d7\u05d6\u05d5\u05d4 cba",
		"fed ~}|{`_^]\[@?>=<;:/.-,+*)('&%$#\"! cba",
		//"××× ~}|{`_^]\[@?>=<;:/.-,+*)('&%$#\"! cba",
		"\u05d6\u05d5\u05d4 ~}|{`_^]\[@?>=<;:/.-,+*)('&%$#\"! cba",
		"\\/ fed cba =-.",
		//"\\/ ××× cba =-.",
		"\\/ \u05d6\u05d5\u05d4 cba =-.",
		"321 cba",
		"104 321 cba",
		"ihg 321 cba",
		"ihg 104 321 cba",
		//"××× 321 cba",
		"\u05d9\u05d8\u05d7 321 cba",
		//"××× 104 321 cba",
		"\u05d9\u05d8\u05d7 104 321 cba",
		"3210cba",
		"104 3210cba",
		"ihg3210cba",
		"ihg104 3210cba",
		//"×××3210cba",
		"\u05d9\u05d8\u05d73210cba",
		//"×××104 3210cba",
		"\u05d9\u05d8\u05d7104 3210cba",
		//"321 ××× cba",
		"321 \u05d6\u05d5\u05d4 cba",
		//"104 321 ××× cba",
		"104 321 \u05d6\u05d5\u05d4 cba",
		//"ihg 321 ××× cba",
		"ihg 321 \u05d6\u05d5\u05d4 cba",
		//"ihg 104 321 ××× cba",
		"ihg 104 321 \u05d6\u05d5\u05d4 cba",
		//"××× 321 ××× cba",
		"\u05d9\u05d8\u05d7 321 \u05d6\u05d5\u05d4 cba",
		//"××× 104 321 ××× cba",
		"\u05d9\u05d8\u05d7 104 321 \u05d6\u05d5\u05d4 cba",
		//"3210××× cba",
		"3210\u05d6\u05d5\u05d4 cba",
		//"104 3210××× cba",
		"104 3210\u05d6\u05d5\u05d4 cba",
		//"ihg43210××× cba",
		"ihg43210\u05d6\u05d5\u05d4 cba",
		//"ihg104 3210××× cba",
		"ihg104 3210\u05d6\u05d5\u05d4 cba",
		//"×××43210××× cba",
		"\u05d9\u05d8\u05d743210\u05d6\u05d5\u05d4 cba",
		//"×××104 3210××× cba",
		"\u05d9\u05d8\u05d7104 3210\u05d6\u05d5\u05d4 cba",
		"fed cba 104 321",
		//"×××)×××(cba",
		"\u05d9\u05d8\u05d7)\u05d6\u05d5\u05d4(cba",
		//"ihg)×××(cba",
		"ihg)\u05d6\u05d5\u05d4(cba",
		//"×××)fed(cba",
		"\u05d9\u05d8\u05d7)fed(cba",
		"ihg)fed(cba",
		//"gfÖ¸edÖ»cba",
		"gf\u05b8ed\u05bbcba",
		//"gfÖ¸××Ö»cba",
		"gf\u05b8\u05d5\u05d4\u05bbcba",
		//"mlk ×?××	×××× cba",
		"mlk \u05da\u05d9\u05d8	\u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk jih	×××× cba",
		"mlk jih	\u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk ×?××	gfed cba",
		"mlk \u05da\u05d9\u05d8	gfed cba",
		"mlk jih	gfed cba",
		//"mlk ×?××  	    ×××× cba",
		"mlk \u05da\u05d9\u05d8  	    \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk jih  	    ×××× cba",
		"mlk jih  	    \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk ×?××  	    gfed cba",
		"mlk \u05da\u05d9\u05d8  	    gfed cba",
		"mlk jih  	    gfed cba",
		//"mlk ×?××\=	-_. ×××× cba",
		"mlk \u05da\u05d9\u05d8\u005c=	-_. \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk jih\=	-_. ×××× cba",
		"mlk jih\=	-_. \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk ×?××\=	-_. gfed cba",
		"mlk \u05da\u05d9\u05d8\u005c=	-_. gfed cba",
		"mlk jih\=	-_. gfed cba",
		//"mlk ×?××\=  	    -_. ×××× cba",
		"mlk \u05da\u05d9\u05d8\u005c=  	    -_. \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk jih\=  	    -_. ×××× cba",
		"mlk jih\=  	    -_. \u05d7\u05d6\u05d5\u05d4 cba",
		//"mlk ×?××\=  	    -_. gfed cba",
		"mlk \u05da\u05d9\u05d8\u005c=  	    -_. gfed cba",
		"mlk jih\=  	    -_. gfed cba",
		//"ihg ××× cba   ",
		"ihg \u05d6\u05d5\u05d4 cba   ",
		//"ihg ××× cba -.",
		"ihg \u05d6\u05d5\u05d4 cba -.",
		//"ihg ××× cba 21",
		"ihg \u05d6\u05d5\u05d4 cba 21",
		"/* 21 = < $1043 % $210 */"
	];
	var allcases = [
		"*** .-=",
		"=-. ***",
		//"=-. ABC ×?××",
		"=-. ABC \u05d0\u05d1\u05d2",
		//"ABC DEF ×?××",
		"ABC DEF \u05d0\u05d1\u05d2",
		//"ABC ×?×× DEF",
		"ABC \u05d0\u05d1\u05d2 DEF",
		//"×?(×)× ABC ×××",
		"\u05d0(\u05d1)\u05d2 ABC \u05d3\u05d4\u05d5",
		//"×?×× A(B)C ×××",
		"\u05d0\u05d1\u05d2 A(B)C \u05d3\u05d4\u05d5",
		//"×?×× ABC DEF",
		"\u05d0\u05d1\u05d2 ABC DEF",
		//"×?×× ABC ×××",
		"\u05d0\u05d1\u05d2 ABC \u05d3\u05d4\u05d5",
		//"××× #123 $234 %340 +401 -012 ×××",
		"\u05d1\u05d2\u05d3 #123 $234 %340 +401 -012 \u05d4\u05d5\u05d6",
		//"×?×× ABC .-=",
		"\u05d0\u05d1\u05d2 ABC .-=",
		//"×?×× ABC ×(×)×",
		"\u05d0\u05d1\u05d2 ABC \u05d3(\u05d4)\u05d5",
		//"ABC 123 ×?×××",
		"ABC 123 \u05d0\u05d1\u05d2\u05d3",
		//"×?××× 123 DEF"
		"\u05d0\u05d1\u05d2\u05d3 123 DEF"
	];
		
	var allinvrs  = [
		"=-. ***",
		"*** .-=",
		//"×××? CBA .-=",
		"\u05d2\u05d1\u05d0 CBA .-=",
		//"×××? FED CBA",
		"\u05d2\u05d1\u05d0 FED CBA",
		//"FED ×××? CBA",
		"FED \u05d2\u05d1\u05d0 CBA",
		//"××× CBA ×)×(×?",
		"\u05d5\u05d4\u05d3 CBA \u05d2)\u05d1(\u05d0",
		//"××× C)B(A ×××?",
		"\u05d5\u05d4\u05d3 C)B(A \u05d2\u05d1\u05d0",
		//"FED CBA ×××?",
		"FED CBA \u05d2\u05d1\u05d0",
		//"××× CBA ×××?",
		"\u05d5\u05d4\u05d3 CBA \u05d2\u05d1\u05d0",
		//"××× 210- 104+ 043% 432$ 321# ×××",
		"\u05d6\u05d5\u05d4 210- 104+ 043% 432$ 321# \u05d3\u05d2\u05d1",
		//"=-. CBA ×××?",
		"=-. CBA \u05d2\u05d1\u05d0",
		//"×)×(× CBA ×××?",
		"\u05d5)\u05d4(\u05d3 CBA \u05d2\u05d1\u05d0",
		//"××××? 321 CBA",
		"\u05d3\u05d2\u05d1\u05d0 321 CBA",
		//"FED 321 ××××?"
		"FED 321 \u05d3\u05d2\u05d1\u05d0"
	];	
	var il2vlmdl = [
		"*** .-=",
		"=-. ***",
		//"=-. ABC ×××?",
		"=-. ABC \u05d2\u05d1\u05d0",
		//"ABC DEF ×××?",
		"ABC DEF \u05d2\u05d1\u05d0",
		//"ABC ×××? DEF",
		"ABC \u05d2\u05d1\u05d0 DEF",
		//"×(×)×? ABC ×××",
		"\u05d2(\u05d1)\u05d0 ABC \u05d5\u05d4\u05d3",
		//"×××? A(B)C ×××",
		"\u05d2\u05d1\u05d0 A(B)C \u05d5\u05d4\u05d3",
		//"×××? ABC DEF",
		"\u05d2\u05d1\u05d0 ABC DEF",
		//"×××? ABC ×××",
		"\u05d2\u05d1\u05d0 ABC \u05d5\u05d4\u05d3",
		//"××× 012- 401+ %340 $234 #123 ×××",
		"\u05d6\u05d5\u05d4 012- 401+ %340 $234 #123 \u05d3\u05d2\u05d1",
		//"×××? ABC .-=",
		"\u05d2\u05d1\u05d0 ABC .-=",
		//"×××? ABC ×(×)×",
		"\u05d2\u05d1\u05d0 ABC \u05d5(\u05d4)\u05d3",
		//"ABC 123 ××××?",
		"ABC 123 \u05d3\u05d2\u05d1\u05d0",
		//"123 ××××? DEF"
		"123 \u05d3\u05d2\u05d1\u05d0 DEF"
	];
	var ir2vlmdl = [
		"=-. ***",
		"*** .-=",
		//"×××? ABC .-=",
		"\u05d2\u05d1\u05d0 ABC .-=",
		//"×××? ABC DEF",
		"\u05d2\u05d1\u05d0 ABC DEF",
		//"DEF ×××? ABC",
		"DEF \u05d2\u05d1\u05d0 ABC",
		//"××× ABC ×(×)×?",
		"\u05d5\u05d4\u05d3 ABC \u05d2(\u05d1)\u05d0",
		//"××× A(B)C ×××?",
		"\u05d5\u05d4\u05d3 A(B)C \u05d2\u05d1\u05d0",
		//"ABC DEF ×××?",
		"ABC DEF \u05d2\u05d1\u05d0",
		//"××× ABC ×××?",
		"\u05d5\u05d4\u05d3 ABC \u05d2\u05d1\u05d0",
		//"××× 012- 401+ %340 $234 #123 ×××",
		"\u05d6\u05d5\u05d4 012- 401+ %340 $234 #123 \u05d3\u05d2\u05d1",
		//"=-. ABC ×××?",
		"=-. ABC \u05d2\u05d1\u05d0",
		//"×(×)× ABC ×××?",
		"\u05d5(\u05d4)\u05d3 ABC \u05d2\u05d1\u05d0",
		//"××××? ABC 123",
		"\u05d3\u05d2\u05d1\u05d0 ABC 123",
		//"DEF 123 ××××?"
		"DEF 123 \u05d3\u05d2\u05d1\u05d0"
	];
	var il2vrmdl = [
		"=-. ***",
		"*** .-=",
		//"×?×× CBA .-=",
		"\u05d0\u05d1\u05d2 CBA .-=",
		//"×?×× FED CBA",
		"\u05d0\u05d1\u05d2 FED CBA",
		//"FED ×?×× CBA",
		"FED \u05d0\u05d1\u05d2 CBA",
		//"××× CBA ×?)×(×",
		"\u05d3\u05d4\u05d5 CBA \u05d0)\u05d1(\u05d2",
		//"××× C)B(A ×?××",
		"\u05d3\u05d4\u05d5 C)B(A \u05d0\u05d1\u05d2",
		//"FED CBA ×?××",
		"FED CBA \u05d0\u05d1\u05d2",
		//"××× CBA ×?××",
		"\u05d3\u05d4\u05d5 CBA \u05d0\u05d1\u05d2",
		//"××× 321# 432$ 043% +104 -210 ×××",
		"\u05d1\u05d2\u05d3 321# 432$ 043% +104 -210 \u05d4\u05d5\u05d6",
		//"=-. CBA ×?××",
		"=-. CBA \u05d0\u05d1\u05d2",
		//"×)×(× CBA ×?××",
		"\u05d3)\u05d4(\u05d5 CBA \u05d0\u05d1\u05d2",
		//"×?××× 321 CBA",
		"\u05d0\u05d1\u05d2\u05d3 321 CBA",
		//"FED ×?××× 321"
		"FED \u05d0\u05d1\u05d2\u05d3 321"
	];
	var ir2vrmdl = [
		"*** .-=",
		"=-. ***",
		//"=-. CBA ×?××",
		"=-. CBA \u05d0\u05d1\u05d2",
		//"FED CBA ×?××",
		"FED CBA \u05d0\u05d1\u05d2",
		//"CBA ×?×× FED",
		"CBA \u05d0\u05d1\u05d2 FED",
		//"×?)×(× CBA ×××",
		"\u05d0)\u05d1(\u05d2 CBA \u05d3\u05d4\u05d5",
		//"×?×× C)B(A ×××",
		"\u05d0\u05d1\u05d2 C)B(A \u05d3\u05d4\u05d5",
		//"×?×× FED CBA",
		"\u05d0\u05d1\u05d2 FED CBA",
		//"×?×× CBA ×××",
		"\u05d0\u05d1\u05d2 CBA \u05d3\u05d4\u05d5",
		//"××× 321# 432$ 043% +104 -210 ×××",
		"\u05d1\u05d2\u05d3 321# 432$ 043% +104 -210 \u05d4\u05d5\u05d6",
		//"×?×× CBA .-=",
		"\u05d0\u05d1\u05d2 CBA .-=",
		//"×?×× CBA ×)×(×",
		"\u05d0\u05d1\u05d2 CBA \u05d3)\u05d4(\u05d5",
		//"321 CBA ×?×××",
		"321 CBA \u05d0\u05d1\u05d2\u05d3",
		//"×?××× 321 FED"
		"\u05d0\u05d1\u05d2\u05d3 321 FED"
	];	
	var vr2ilmdl = [
		"=-. ***",
		"*** .-=",
		//"×?×× CBA .-=",
		"\u05d0\u05d1\u05d2 CBA .-=",
		//"×?×× FED CBA",
		"\u05d0\u05d1\u05d2 FED CBA",
		//"FED ×?×× CBA",
		"FED \u05d0\u05d1\u05d2 CBA",
		//"××× CBA ×?)×(×",
		"\u05d3\u05d4\u05d5 CBA \u05d0)\u05d1(\u05d2",
		//"××× C)B(A ×?××",
		"\u05d3\u05d4\u05d5 C)B(A \u05d0\u05d1\u05d2",
		//"FED CBA ×?××",
		"FED CBA \u05d0\u05d1\u05d2",
		//"××× CBA ×?××",
		"\u05d3\u05d4\u05d5 CBA \u05d0\u05d1\u05d2",
		//"××× 321# 432$ 043% +104 -210 ×××",
		"\u05d1\u05d2\u05d3 321# 432$ 043% +104 -210 \u05d4\u05d5\u05d6",
		//"=-. CBA ×?××",
		"=-. CBA \u05d0\u05d1\u05d2",
		//"×)×(× CBA ×?××",
		"\u05d3)\u05d4(\u05d5 CBA \u05d0\u05d1\u05d2",
		//"321 ×?××× CBA",
		"321 \u05d0\u05d1\u05d2\u05d3 CBA",
		//"FED 321 ×?×××"
		"FED 321 \u05d0\u05d1\u05d2\u05d3"
	];
	var vl2irmdl = [
		"=-. ***",
		"*** .-=",
		//"×××? ABC .-=",
		"\u05d2\u05d1\u05d0 ABC .-=",
		//"×××? ABC DEF",
		"\u05d2\u05d1\u05d0 ABC DEF",
		//"DEF ×××? ABC",
		"DEF \u05d2\u05d1\u05d0 ABC",
		//"××× ABC ×(×)×?",
		"\u05d5\u05d4\u05d3 ABC \u05d2(\u05d1)\u05d0",
		//"××× A(B)C ×××?",
		"\u05d5\u05d4\u05d3 A(B)C \u05d2\u05d1\u05d0",
		//"ABC DEF ×××?",
		"ABC DEF \u05d2\u05d1\u05d0",
		//"××× ABC ×××?",
		"\u05d5\u05d4\u05d3 ABC \u05d2\u05d1\u05d0",
		//"××× 012- 401+ %340 $234 #123 ×××",
		"\u05d6\u05d5\u05d4 012- 401+ %340 $234 #123 \u05d3\u05d2\u05d1",
		//"=-. ABC ×××?",
		"=-. ABC \u05d2\u05d1\u05d0",
		//"×(×)× ABC ×××?",
		"\u05d5(\u05d4)\u05d3 ABC \u05d2\u05d1\u05d0",
		//"××××? 123 ABC",
		"\u05d3\u05d2\u05d1\u05d0 123 ABC",
		//"123 DEF ××××?"
		"123 DEF \u05d3\u05d2\u05d1\u05d0"
	];	
	
	var bdEngine;
	doh.register('dojox.string.tests.BidiEngine.BidiEngine', [
		{	
		
			// testmati - case 37
			name:'1. typeoftext=implicit:visual, orientation=ltr, swapping=yes:no',

			setUp: function(){
				bdEngine = new dojox.string.BidiEngine();
			},
			
			runTest:function() {
				dojo.forEach(unilisrc, function(el, i){	
					doh.is(uniliout[i], bdEngine.bidiTransform(el, 'ILYNN', 'VLNNN'),"bidiTransform: string num: " + i + " in: unilisrc out: uniliout");
				},this);
			}
		},
		{
			// testmati - case 38
			name:'2. typeoftext=implicit:visual, orientation=rtl:ltr, swapping=yes:no',

			runTest:function() {
				dojo.forEach(unirisrc, function(el, i){	
					doh.is(uniriout[i], bdEngine.bidiTransform(el, 'IRYNN', 'VLNNN'),"bidiTransform: string num: " + i + " in: unirisrc out: uniriout");
				},this);
			}
		},
		{
			// testmati - case 41
			name:'3. typeoftext=imsplicit:imsplicit, orientation=ltr:contextual, context=ltr, swapping=yes',

			runTest:function() {
				dojo.forEach(unilisrc, function(el, i){	
					doh.is(unilisrc[i], bdEngine.bidiTransform(el, 'ILYNN', 'ILYNN'),"bidiTransform: string num: " + i + " in: unilisrc out: unilisrc");
				},this);
			}
		},
		{
			// testmati - case 42
			name:'4. typeoftext=visual:visual, orientation=ltr:ltr, swapping=no:no',

			runTest:function() {
				dojo.forEach(unilisrc, function(el, i){	
					doh.is(unilisrc[i], bdEngine.bidiTransform(el, 'VLYNN', 'VLYNN'),"bidiTransform: string num: " + i + " in: unilisrc out: unilisrc");
				},this);
			}
		},
		{
			// testmati - case 43
			name:'5. typeoftext=visual:visual, orientation=ltr:rtl, swapping=no:no',

			runTest:function() {
				dojo.forEach(unilisrc, function(el, i){	
					doh.is(unilicrs[i], bdEngine.bidiTransform(el, 'VLYNN', 'VRYNN'),"bidiTransform: string num: " + i + " in: unilisrc out: unilicrs");
				},this);
			}
		},
		{
			// testmati - case 44
			name:'6. typeoftext=visual:visual, orientation=rtl:ltr, swapping=no:no',

			runTest:function() {
				dojo.forEach(unilisrc, function(el, i){	
					doh.is(unilicrs[i], bdEngine.bidiTransform(el, 'VRNNN', 'VLYNN'),"bidiTransform: string num: " + i + " in: unilisrc out: unilicrs");
				},this);
			}
		},
		{
			// testmati - case 1
			name:'7. typeoftext=visual:visual, orientation=ltr:ltr, swapping=no:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(allcases[i], bdEngine.bidiTransform(el, 'VLNNN', 'VLNNN'),"bidiTransform: string num: " + i + " in: allcases out: allcases");
				},this);
			}
		},
		{
			// testmati - case 2
			name:'8. typeoftext=visual:visual, orientation=rtl:ltr, swapping=no:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(allinvrs[i], bdEngine.bidiTransform(el, 'VRNNN', 'VLNNN'),"bidiTransform: string num: " + i + " in: allcases out: allinvrs");
				},this);
			}
		},
		{
			// testmati - case 3
			name:'9. typeoftext=visual:visual, orientation=ltr:rtl, swapping=no:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(allinvrs[i], bdEngine.bidiTransform(el, 'VLNNN', 'VRNNN'),"bidiTransform: string num: " + i + " in: allcases out: allinvrs");
				},this);
			}
		},
		{
			// testmati - case 4
			name:'10. typeoftext=visual:visual, orientation=rtl:rtl, swapping=no:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(allcases[i], bdEngine.bidiTransform(el, 'VRNNN', 'VRNNN'), "bidiTransform: string num: " + i + " in: allcases out: allcases");
				},this);
			}
		},
		{
			// testmati - case 5
			name:'11. typeoftext=implicit:visual, orientation=ltr:ltr, swapping=yes:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(il2vlmdl[i], bdEngine.bidiTransform(el, 'ILYNN', 'VLNNN'), "bidiTransform: string num: " + i + " in: allcases out: il2vlmdl");
				},this);
			}
		},
		{
			// testmati - case 6
			name:'12. typeoftext=implicit:visual, orientation=rtl:ltr, swapping=yes:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(ir2vlmdl[i], bdEngine.bidiTransform(el, 'IRYNN', 'VLNNN'), "bidiTransform: string num: " + i + " in: allcases out: ir2vlmdl");
				},this);
			}
		},
		{
			// testmati - case 7
			name:'13. typeoftext=implicit:visual, orientation=ltr:rtl, swapping=yes:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(il2vrmdl[i], bdEngine.bidiTransform(el, 'ILYNN', 'VRNNN'), "bidiTransform: string num: " + i + " in: allcases out: il2vrmdl");
				},this);
			}
		},
		{
			// testmati - case 8
			name:'14. typeoftext=implicit:visual, orientation=rtl:rtl, swapping=yes:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(ir2vrmdl[i], bdEngine.bidiTransform(el, 'IRYNN', 'VRNNN'), "bidiTransform: string num: " + i + " in: allcases out: ir2vrmdl");
				},this);
			}
		},
		{
			// testmati - case 9
			name:'15. typeoftext=visual:implicit, orientation=ltr:ltr, swapping=no:yes',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(il2vlmdl[i], bdEngine.bidiTransform(el, 'VLNNN', 'ILYNN'), "bidiTransform: string num: " + i + " in: allcases out: il2vlmdl");
				},this);
			}
		},
		{
			// testmati - case 10
			name:'16. typeoftext=visual:implicit, orientation=rtl:ltr, swapping=no:yes',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(vr2ilmdl[i], bdEngine.bidiTransform(el, 'VRNNN', 'ILYNN'), "bidiTransform: string num: " + i + " in: allcases out: vr2ilmdl");
				},this);
			}
		},
		{
			// testmati - case 11
			name:'17. typeoftext=visual:implicit, orientation=ltr:rtl, swapping=no:yes',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(vl2irmdl[i], bdEngine.bidiTransform(el, 'VLNNN', 'IRYNN'), "bidiTransform: string num: " + i + " in: allcases out: vl2irmdl");
				},this);
			}
		},
		{
			// testmati - case 12
			name:'18. typeoftext=visual:implicit, orientation=rtl:rtl, swapping=no:yes',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(ir2vrmdl[i], bdEngine.bidiTransform(el, 'VRNNN', 'IRYNN'), "bidiTransform: string num: " + i + " in: allcases out: ir2vrmdl");
				},this);
			}
		},
		{
			// testmati - case 13
			name:'19. typeoftext=implicit:implicit, orientation=ltr:ltr, swapping=no:no',

			runTest:function() {
				dojo.forEach(allcases, function(el, i){	
					doh.is(allcases[i], bdEngine.bidiTransform(el, 'ILNNN', 'ILNNN'), "bidiTransform: string num: " + i + " in: allcases out: allcases");
				},this);
			}
		}
	]);
	

});