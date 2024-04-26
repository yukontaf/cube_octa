# Databricks notebook source
from cube import TemplateContext
 
template = TemplateContext()
 
# Accessible from Jinja as 'get_data()'
def get_data_1():
  return 1
template.add_function('get_data', get_data_1)