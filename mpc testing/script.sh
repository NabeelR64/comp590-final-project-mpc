#you can assume the shares are sorted into the correct directories 
#this line is age for person 1
python3 share.py 20 nabeel_1.txt nabeel_2.txt
#this line is smoker status for person 1, 1 for yes and 0 for no
python3 share.py 1 nabeel_s_1.txt nabeel_s_2.txt
#this line is age for person 2
python3 share.py 23 ameen_1.txt ameen_2.txt
#this line is smoker status for person 2, 1 for yes and 0 for no
python3 share.py 0 ameen_s_1.txt ameen_s_2.txt
#this line is age for person 3
python3 share.py 22 sahra_1.txt sahra_2.txt
#this line is smoker status for person 3, 1 for yes and 0 for no
python3 share.py 1 sahra_s_1.txt sahra_s_2.txt
#this line is for calculating product of age_shares_1 and smoker_shares_1
python3 server.py age_shares_1 smoker_shares_1 age_smoker_product_1.txt
#this line is for calculating product of age_shares_2 and smoker_shares_2
python3 server.py age_shares_2 smoker_shares_2 age_smoker_product_2.txt
#this line calculates the mean
python3 merge_mean.py age_smoker_product_1.txt age_smoker_product_2.txt