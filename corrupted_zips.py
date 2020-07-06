#!/usr/bin/python
import os
import time
import xlsxwriter
from xlwt import *
import time , xlwt

import cgi,shelve
import cgitb
import MySQLdb ,time
import time,sys
from sets import Set 
import sys, os,json, ast
from datetime  import datetime
import shelve,time
from datetime import datetime as dt
from datetime import timedelta
from datetime import date
import sets,smtplib,base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.utils import COMMASPACE, formatdate
from os.path import basename
from email.mime.base import MIMEBase
from email import encoders

print "Content-Type: text/html\n\n"
class db_selection:
    def get_corrupted_zip(self):
        f = open('/var/www/html/corrupted_zip.txt','w')
        path = '/var/www/html/TOC_PDF/corrupted_Zips/'
        lst = os.listdir('/var/www/html/TOC_PDF/corrupted_Zips/')
        fil_date= (time.strftime("%d-%m-%Y"))
        wb = xlsxwriter.Workbook('/var/www/html/sushmita/CorruptesZip_'+str(fil_date)+'.xlsx')
        ws = wb.add_worksheet('Corrupted Zip Files')
        cell_format = wb.add_format({'bold':True , 'italic':True})
        cell_format.set_bg_color('yellow')
        ws.write('A1','ZipFileName',cell_format)
        ws.write('B1','ReceivedDate',cell_format)
        cnt = 2
        for i in lst:
            zip_path = os.path.join(path,i)
            #print zip_path
            #info = str(os.system('ls -ltr '+zip_path))
            #if 1:
            #if '26' in info:
            #    print info.split(' ')
            tt = time.ctime(os.path.getctime(zip_path))
            tt = tt.split(' ')
            if tt[1] == 'May':
                mm = '05'
            if tt[1] == 'Jun':
                mm = '06'
            #date = tt[2]+'/'+mm+'/'+tt[4]

            #if tt[1] == 'May' and tt[2] == '30':
            #    print i
            #    f.write(i)
            #    f.write('\n')
            #ws.write('A'+str(cnt),i)
            #ws.write('B'+str(cnt),date)
            #cnt = cnt+1
            if len(tt) == 5:
                print i ,tt[2]+'/'+mm+'/'+tt[4]
                date = tt[2]+'/'+mm+'/'+tt[4]
                ws.write('A'+str(cnt),i)
                ws.write('B'+str(cnt),date)
            if len(tt) == 6:
                print i ,tt[3]+'/'+mm+'/'+tt[5]
                date = tt[3]+'/'+mm+'/'+tt[5]
                ws.write('A'+str(cnt),i)
                ws.write('B'+str(cnt),date)
            cnt = cnt+1
        wb.close()

    def create_html(self):
           fil_date= (time.strftime("%d-%m-%Y"))
           filename = 'http://172.16.20.246/sushmita/CorruptesZip_'+str(fil_date)+'.xlsx'

        
           s='''<html><title></title><bod>Please go through the link for corrupted Zips<br><br><br>%s</body></html>'''%(filename)
           return s




    def sendEmail(self,htmls_str):
        sender = 'tocreport@tas.in'
        #toaddr = ['tr_research@tas.in']
        #toaddr = ['aniket.t@tas.in']
        toaddr = ['kabadi.sushmita@tas.in','pradeep.kumar@tas.in']
        cc = []
        bcc = []
        user = 'tocreport@tas.in'
        pwd = 'Sx(TIsP2'
        receivers = toaddr + cc + bcc
        msg = MIMEMultipart()
        #msg["From"] = 'dharitri.p@tas.in'
        msg["From"] = 'system@tas.in'
        msg["To"] = ','.join(toaddr)
        msg["Cc"] = ','.join(cc)
        msg["BCc"] = ','.join(bcc)
        msg["Subject"] = "Corrupted Zips "
        msg["Date"] = formatdate(localtime=True)
        html_body = MIMEText(htmls_str.encode('utf-8'),'html','UTF-8')
        msg.attach(html_body)
        fil_date= (time.strftime("%d-%m-%Y"))
        filename = '/var/www/html/sushmita/CorruptesZip_'+str(fil_date)+'.xlsx'
        fp = open(filename, "rb")
        attachment = MIMEBase('application','txt')
        attachment.set_payload(fp.read())
        fp.close()
        encoders.encode_base64(attachment)
        attachment.add_header("Content-Disposition", "attachment", filename=basename(filename))
        msg.attach(attachment)
        print 'msg.as_string()'

        if 1:
           smtpObj = smtplib.SMTP('smtp.tas.in',587)
           smtpObj.ehlo()
           smtpObj.starttls()
           smtpObj.ehlo()
           smtpObj.login(user, pwd)
           smtpObj.sendmail(sender, receivers, msg.as_string())
           print "Successfully sent email"

        #self.create_html(all_doc)
if __name__ == '__main__':
    obj=db_selection()
    while 1:
      mail_time=((time.strftime("%H:%M:%S")))
      #print type(mail_time)
      print  mail_time
      if mail_time == '18:00:00':

          #sys.exit()
          mail_date= (time.strftime("%d-%m-%Y"))
          print mail_date
          print '/var/www/html/sushmita/CorruptesZip_'+str(mail_date)+'.xlsx'
          obj.get_corrupted_zip()
          html_str = obj.create_html()
          obj.sendEmail(html_str)
          #if mail_date=='05-10-2015':
          #  if  mail_time =='16:00:00':
          #    temp=obj.sendEmail()
           # print result
