﻿using Domain;
using Domain.Entities;
using Domain.Services;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Database
{
    public class ReportRepository : IRepository<Report>
    {
        private LiteDatabase _database;
        private ILiteCollection<Report> _collection;

        public ReportRepository(LiteDatabase database)
        {
            _database = database;
            _collection = _database.GetCollection<Report>("Reports");
        }
        public void Add(Report entity) => _collection.Insert(entity);


        public void Delete(Report entity) => _collection.Delete(entity.Id);

        public void DeleteAll() => _collection.DeleteAll();

        public IEnumerable<Report> GetAll() => _collection.FindAll();

        public void GetById(int id) => _collection.FindById(id);

        public void Update(Report entity) => _collection.Update(entity);
    }

}
