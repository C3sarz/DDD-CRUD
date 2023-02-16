﻿using Domain.Entities;
using Domain.Services;
using FluentValidation;
using Infrastructure.Validators;
using System.ComponentModel.DataAnnotations;

namespace API.Services
{
    public class ReportService : IReportService
    {
        private IRepository<ReportAggregate> _repository;

        private ReportAggregateValidator _validator;

        public ReportService(IRepository<ReportAggregate> repository)
        {
            _repository = repository;
            _validator = new ReportAggregateValidator();
        }
        public void CreateReport(ReportAggregate report)
        {
            _validator.ValidateAndThrow(report);
            _repository.Add(report);
        }

        public void DeleteReport(int id) => _repository.Delete(id);

        public IEnumerable<ReportAggregate> GetAllReports() => _repository.GetAll();

        public ReportAggregate GetReport(int Id) => _repository.GetById(Id);

        public void UpdateReport(ReportAggregate report)
        {
            _validator.ValidateAndThrow(report);
            _repository.Update(report);
        }
    }
}
