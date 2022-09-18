from unqlite import UnQLite

db = UnQLite('sample.db')
data = db.collection('data')
# Graded Cell, PartID: o1flK

def FindBusinessBasedOnCity(cityToSearch, saveLocation1, collection):
    businesses = collection.filter(lambda : business['city'] == cityToSearch)
    print(businesses)

    f1 = open(saveLocation1, "wb")
    for business in collection.filter(lambda : business['city'] == cityToSearch):
        result = str(business['name']).upper() + "$" + str(business['full_address']).replace("\n",",").upper() + "$" + str(business['city']).upper() + "$" + str(business['state']).upper() + "\n"
        print(result)
        f1.write(result)
    f1.close()
    pass

def FindBusinessBasedOnLocation(categoriesToSearch, myLocation, maxDistance,
saveLocation2, collection):
    pass
# #!/usr/bin/python2.7
# #
# # Assignment2 Interface
# #
#
# import psycopg2
# import os
# import sys
# # Donot close the connection inside this file i.e. do not perform openconnection.close()
#
# def RangeQuery(ratingsTableName, ratingMinValue, ratingMaxValue, openconnection):
#     dbcon=openconnection.cursor()
#     query_list=[]
#
#     dbcon.execute("select count(*) from RangeRatingsMetaData;")
#     rangecount = int(dbcon.fetchone()[0])
#
#     for i in range(rangecount):
#         query_list.append("SELECT 'rangeratingspart" + str(i) + "' AS tablename, userid, movieid, rating FROM rangeratingspart" + str(i) +
#                         " WHERE rating >= " + str(ratingMinValue) + " AND rating <= " + str(ratingMaxValue))
#
#     dbcon.execute("SELECT PartitionNum FROM RoundRobinRatingsMetadata")
#     roundpartitions = int(dbcon.fetchone()[0])
#
#     for i in range(roundpartitions):
#         query_list.append("SELECT 'roundrobinratingspart" + str(i) + "' AS tablename, userid, movieid, rating FROM roundrobinratingspart" + str(i) +
#                         " WHERE rating >= " + str(ratingMinValue) + " AND rating <= " + str(ratingMaxValue))
#
#     op_query = 'SELECT * FROM ({0}) AS T'.format(' UNION ALL '.join(query_list))
#     print(op_query)
#     opfile = open('RangeQueryOut.txt', 'w')
#
#     write_file = "COPY (" + op_query + ") TO '" + os.path.abspath(opfile.name) + "' (FORMAT text, DELIMITER ',')"
#
#     dbcon.execute(write_file)
#
#     dbcon.close()
#     opfile.close()
#
#
#
# def PointQuery(ratingsTableName, ratingValue, openconnection):
#     dbcon = openconnection.cursor()
#     query_list = []
#
#     dbcon.execute("SELECT COUNT(*) FROM RangeRatingsMetadata")
#     rangecount = int(dbcon.fetchone()[0])
#
#     for i in range(rangecount):
#         query_list.append("SELECT 'rangeratingspart" + str(i) + "' AS tablename, userid, movieid, rating FROM rangeratingspart"
#                         + str(i) + " WHERE rating = " + str(ratingValue))
#
#     dbcon.execute("SELECT PartitionNum FROM RoundRobinRatingsMetadata")
#     roundnpartitions = int(dbcon.fetchone()[0])
#
#     for i in range(roundnpartitions):
#         query_list.append("SELECT 'roundrobinratingspart" + str(i) + "' AS tablename, userid, movieid, rating FROM roundrobinratingspart"
#                         + str(i) + " WHERE rating = " + str(ratingValue))
#
#     op_query = 'SELECT * FROM ({0}) AS T'.format(' UNION ALL '.join(query_list))
#     opfile = open('PointQueryOut.txt', 'w')
#
#     write_file = "COPY (" + op_query + ") TO '" + os.path.abspath(opfile.name) + "' (FORMAT text, DELIMITER ',')"
#
#     dbcon.execute(write_file)
#     dbcon.close()
#     opfile.close()
#
# def writeToFile(filename, rows):
#     f = open(filename, 'w')
#     for line in rows:
#         f.write(','.join(str(s) for s in line))
#         f.write('\n')
#     f.close()