# Perles_djikstra
Les perles de Djikstra, un problème algorythmique de récursivité

J'ai publié et expliqué mon implementation sur l'article wikipédia :
https://fr.wikipedia.org/wiki/Perles_de_Dijkstra

Première version en javascript, pour vérifier la validité de mon algorythme, puis adaptation en C pour les performances !

Dans chaque version il y a une fonction dédiée au test unitaire de "verifier()", et une variable globale "iterations"

La taille du tableau alloué en C est celle du nombre d'iterations, la longueur de la chaine de caractère pour 30000 itération est d'environ 27500 caractères, donc pas de gaspillage trop important de mémoire.

L'optimisation algorythmique la plus importante du code est celle de la fonction verification_opti (c'est celle qui est implementée en C sous le nom de verification() )
C'est plutôt simple, comme à chaque iteration n du programme on veut tester la validité du dernier chiffre que l'on tente de concaténer, la fonction considère que le début de la chaine est valide.
