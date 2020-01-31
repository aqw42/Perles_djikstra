#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

// Utils

int iterations = 30000;

// ############# verifications #############

// 1 = sequence valide | 0 = sequence invalide
char verifier_sequence(char *str, int deb, int mi)
{
	int max = mi - deb;

	for (int i = 0; i < max; i++)
	{
		if (str[deb + i] != str[mi + i])
			return (1);
	}
	return (0);
}

// 1 = sequence valide | 0 = sequence invalide
char verifier(char *fil)
{
	int max = strlen(fil);

	if (max <= 1)
		return (1);
	for (int i = 2; i <= max; i += 2)
		if (!verifier_sequence(fil, max - i, max - (i / 2)))
			return (0);
	return (1);
}

// Backtracking

char *time_machine(char *fil)
{
	if (fil[strlen(fil) - 1] != '2')
		fil[strlen(fil) - 1]++;
	else
	{
		fil[strlen(fil) - 1] = '\0';
		fil = time_machine(fil);
	}
	return (fil);
}

char *ajouter_perle(char *fil)
{
	if (iterations-- < 0)
		return (fil);

	strcat(fil, "0");
	if (verifier(fil))
		return ajouter_perle(fil);
	fil[strlen(fil) - 1] = '\0';

	strcat(fil, "1");
	if (verifier(fil))
		return ajouter_perle(fil);
	fil[strlen(fil) - 1] = '\0';

	strcat(fil, "2");
	if (verifier(fil))
		return ajouter_perle(fil);
	fil[strlen(fil) - 1] = '\0';

	do {
		fil = time_machine(fil);
	} while (!verifier(fil));

	return ajouter_perle(fil);
}

// Main

void 	test(char *str, char value)
{
	int value_ = verifier(str);

	if (value != value_)
		printf("Fail : %s => %d | %d\n", str, value, value_);
	printf("Yay !\n");
}

void 	test_verifier(void)
{
	char *str = "00";
	char value = 0;

	printf("=== Start test ===\n");
	test(str, value);
	str = "0001";
	value = 1;
	test(str, value);
	str = "0001";
	value = 1;
	test(str, value);
	str = "020100";
	value = 0;
	test(str, value);
	str = "020101";
	value = 0;
	test(str, value);
	str = "121121";
	value = 0;
	test(str, value);
	str = "0201210";
	value = 1;
	test(str, value);
	printf("=== End test ===\n");
}

int 	main(int argc, char **argv)
{
	char *str = malloc(iterations);

	if (argc == 2)
		iterations = atoi(argv[1]);
	str[0] = '\0';
	test_verifier();
	ajouter_perle(str);
	write(1, str, strlen(str));
	printf("\n %d", strlen(str));
}