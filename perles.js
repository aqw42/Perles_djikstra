// Verification validité string

function verifier_sequence(sequence_a, sequence_b)
{
	var maxI = sequence_a.length;
	for (var i = 0; i < maxI; i++)
	{
		if (sequence_a[i] != sequence_b[i])
			return true;
	}
	return false;
}

function verifier_a_partir_de(morceau)
{
	var maxJ = morceau.length;
	for ( var j = 2; j <= maxJ; j += 2 )
	{
		var sequence_a = morceau.substring(0, j / 2);
		var sequence_b = morceau.substring(j / 2, j);
		if ( !verifier_sequence(sequence_a, sequence_b) )
			return false;
	}
	return true;
}

function verifier(fil) {
	var maxI = fil.length;
	for ( var i = 0; i < maxI; i++ ) {
		if ( !verifier_a_partir_de(fil.substring(i, fil.length)) )
			return false;
	}
	return true;
}

// Verification validité string optimisé (considere que la chaine est vraie si on lui retire la derniere perle)

function verifier_opti(fil) {
	var maxJ = fil.length;
	for ( var j = 2; j <= maxJ; j += 2)
	{
		var sequence_a = fil.substring(maxJ - j, maxJ - j / 2);
		var sequence_b = fil.substring(maxJ - j / 2, maxJ);
		if ( !verifier_sequence(sequence_a, sequence_b) )
			return false;
	}
	return true;
}


// Backtracking

function time_machine(fil)
{
	if ( fil[fil.length - 1] == "0" )
	{
		fil = fil.substring(0, fil.length - 1) + "1";
	}
	else if ( fil[fil.length - 1] == "1" )
		fil = fil.substring(0, fil.length - 1) + "2";
	else
		fil = time_machine(fil.substr(0, fil.length - 1));
	return fil;
}

function ajouter_perle(fil) {
	// avoid stack overflow or too long execution
	if (iterations-- < 0)
		return (fil);

	if (verifier_ft(fil + "0")) {
		return ajouter_perle(fil + "0");
	}
	else if (verifier_ft(fil + "1")) {
		return ajouter_perle(fil + "1");
	}
	else if (verifier_ft(fil + "2")) {
		return ajouter_perle(fil + "2");
	}

	do {
		fil = time_machine(fil);
	} while (!verifier_ft(fil))

	return ajouter_perle(fil);
}



// ####### unit test ########

function test(fil, result)
{
	result_ = verifier_ft(fil);
	 if ( result_ !== result )
		console.log("ERROR :" + fil + " expected " + result + ": returned " + result_);
	else
		console.log("test success");
}

function test_verifier()
{
	var fil;

	fil = "00";
	res = false;
	test(fil, res);

	fil = "01";
	res = true;
	test(fil, res);

	fil = "001";
	res = false;
	test(fil, res);

	fil = "120";
	res = true;
	test(fil, res);

	fil = "12002";
	res = false;
	test(fil, res);

	fil = "01202";
	res = true;
	test(fil, res);

	fil = "012102012";
	res = true;
	test(fil, res);

	fil = "01020120210120102012021020102101201020120210120102101202102010210120102012021012010201";
	res = true;
	test(fil, res);

	fil = "01020120210120102012021020102101201020120210120102101202102010210120102012021012102010210";
	res = true;
	test (fil, res);
}

var iterations = 30000;
var verifier_ft = verifier_opti

function start () {
	test_verifier();

	console.log("iterations : " + iterations);
	var result = ajouter_perle("");
	console.log("RESULT     : " + result);
	console.log("Validity   : " + verifier(result));
}

start ();