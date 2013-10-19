$(document).ready(function () {
	var i = 0, max = em.TITLES.length;
	
	em.fuzzyset = Fuzzyset() 
	
	for (; i < max; i += 1) {
	    em.fuzzyset.add(em.TITLES[i]);
	}
});
