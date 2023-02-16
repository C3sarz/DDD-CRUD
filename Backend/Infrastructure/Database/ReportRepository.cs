using Domain;
using Domain.Entities;
using Domain.Services;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Database
{
    public class ReportRepository : IRepository<ReportAggregate>
    {
        private LiteDatabase _database;
        private ILiteCollection<ReportAggregate> _collection;

        public ReportRepository(LiteDatabase database)
        {
            _database = database;
            _collection = _database.GetCollection<ReportAggregate>("Reports");
        }
        public int Add(ReportAggregate entity) => _collection.Insert(entity);

        public bool Delete(int id) => _collection.Delete(id);

        public bool DeleteAll() => _collection.DeleteAll() > 0;

        public IEnumerable<ReportAggregate> GetAll() => _collection.FindAll();

        public ReportAggregate GetById(int id) => _collection.FindById(id);

        public bool Update(ReportAggregate entity) => _collection.Update(entity);

        /// <summary>
        /// No need to implement since LiteDB does not have a dispose method.
        /// </summary>
        public void Dispose() { }
    }

}
